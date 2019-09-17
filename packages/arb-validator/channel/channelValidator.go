/*
 * Copyright 2019, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package channel

import (
	"context"
	"errors"
	"math/big"

	"github.com/offchainlabs/arbitrum/packages/arb-validator/ethvalidator"

	errors2 "github.com/pkg/errors"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/offchainlabs/arbitrum/packages/arb-util/machine"
	"github.com/offchainlabs/arbitrum/packages/arb-util/protocol"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/ethconnection"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/hashing"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/valmessage"
)

type ChannelValidator struct {
	*ethvalidator.VMValidator
	Validators map[common.Address]validatorInfo
	arbChannel *ethconnection.ArbChannel
}

func (val *ChannelValidator) ValidatorCount() int {
	return len(val.Validators)
}

type validatorInfo struct {
	indexNum uint16
}

func NewChannelValidator(
	val *ethvalidator.Validator,
	vmID common.Address,
	machine machine.Machine,
	config *valmessage.VMConfiguration,
) (*ChannelValidator, error) {
	con, err := ethconnection.NewArbChannel(vmID, val.Client)
	if err != nil {
		return nil, err
	}

	vmVal, err := ethvalidator.NewVMValidator(
		val,
		vmID,
		machine,
		config,
		con,
	)
	if err != nil {
		return nil, err
	}

	manMap := make(map[common.Address]validatorInfo)
	keys := make([]common.Address, 0, len(config.AssertKeys))
	for _, key := range config.AssertKeys {
		var address common.Address
		copy(address[:], key.Value)
		keys = append(keys, address)
	}
	for i, add := range keys {
		manMap[add] = validatorInfo{uint16(i)}
	}

	_, found := manMap[val.Address()]
	if !found {
		return nil, errors.New("key is not a validator of chosen ArbChannel")
	}

	chanVal := &ChannelValidator{
		vmVal,
		manMap,
		con,
	}
	if err := chanVal.topOffDeposit(context.Background()); err != nil {
		return nil, errors2.Wrap(err, "ChannelValidator failed to top off deposit")
	}
	return chanVal, nil
}

func (val *ChannelValidator) topOffDeposit(ctx context.Context) error {
	callOpts := &bind.CallOpts{
		Pending: true,
		From:    val.Address(),
		Context: context.Background(),
	}
	current, err := val.arbChannel.CurrentDeposit(callOpts, val.Address())
	if err != nil {
		return err
	}
	required, err := val.arbChannel.EscrowRequired(callOpts)
	if current.Cmp(required) >= 0 {
		// ChannelValidator already has escrow deposited
		return nil
	}
	depToAdd := new(big.Int).Sub(required, current)
	_, err = val.arbChannel.IncreaseDeposit(val.Validator.MakeAuth(ctx), depToAdd)
	if err != nil {
		return errors2.Wrap(err, "failed calling IncreaseDeposit")
	}
	return nil
}

func (val *ChannelValidator) FinalizedUnanimousAssert(
	ctx context.Context,
	newInboxHash [32]byte,
	assertion *protocol.Assertion,
	signatures [][]byte,
) (chan *types.Receipt, chan error) {
	receiptChan := make(chan *types.Receipt, 1)
	errChan := make(chan error, 1)
	go func() {
		defer close(receiptChan)
		defer close(errChan)
		val.Mutex.Lock()
		receipt, err := val.arbChannel.FinalizedUnanimousAssert(
			val.Validator.MakeAuth(ctx),
			newInboxHash,
			assertion,
			signatures,
		)
		if err != nil {
			errChan <- errors2.Wrap(err, "failed sending finalized unanimous assertion")
		} else {
			receiptChan <- receipt
		}
		val.Mutex.Unlock()
	}()
	return receiptChan, errChan
}

func (val *ChannelValidator) PendingUnanimousAssert(
	ctx context.Context,
	newInboxHash [32]byte,
	assertion *protocol.Assertion,
	sequenceNum uint64,
	signatures [][]byte,
) (chan *types.Receipt, chan error) {
	receiptChan := make(chan *types.Receipt, 1)
	errChan := make(chan error, 1)
	go func() {
		defer close(receiptChan)
		defer close(errChan)
		val.Mutex.Lock()
		receipt, err := val.arbChannel.PendingUnanimousAssert(
			val.Validator.MakeAuth(ctx),
			newInboxHash,
			assertion,
			sequenceNum,
			signatures,
		)
		if err != nil {
			errChan <- errors2.Wrap(err, "failed proposing unanimous assertion")
		} else {
			receiptChan <- receipt
		}
		val.Mutex.Unlock()
	}()
	return receiptChan, errChan
}

func (val *ChannelValidator) ConfirmUnanimousAsserted(
	ctx context.Context,
	newInboxHash [32]byte,
	assertion *protocol.Assertion,
) (chan *types.Receipt, chan error) {
	receiptChan := make(chan *types.Receipt, 1)
	errChan := make(chan error, 1)
	go func() {
		defer close(receiptChan)
		defer close(errChan)
		val.Mutex.Lock()
		receipt, err := val.arbChannel.ConfirmUnanimousAsserted(
			val.Validator.MakeAuth(ctx),
			newInboxHash,
			assertion,
		)
		if err != nil {
			errChan <- errors2.Wrap(err, "failed confirming unanimous assertion")
		} else {
			receiptChan <- receipt
		}
		val.Mutex.Unlock()
	}()
	return receiptChan, errChan
}

func (val *ChannelValidator) UnanimousAssertHash(
	sequenceNum uint64,
	beforeHash [32]byte,
	newInboxHash [32]byte,
	originalInboxHash [32]byte,
	assertion *protocol.Assertion,
) ([32]byte, error) {
	return hashing.UnanimousAssertHash(
		val.VMID,
		sequenceNum,
		beforeHash,
		newInboxHash,
		originalInboxHash,
		assertion,
	)
}
