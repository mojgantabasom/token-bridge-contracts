/*
* Copyright 2020, Offchain Labs, Inc.
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

package message

type L2SubType uint8

const (
	TransactionType         L2SubType = 0
	ContractTransactionType           = 1
	CallType                          = 2
	TransactionBatchType              = 3
	SignedTransactionType             = 4
	DeployBuddyContract               = 5
)

const AddressSize = 32

const TransactionHeaderSize = 32*4 + AddressSize
const SignatureSize = 65

type AbstractL2Message interface {
	L2Type() L2SubType
	AsData() []byte
}

//type BuddyDeployment struct {
//	MaxGas      *big.Int
//	GasPriceBid *big.Int
//	DestAddress common.Address
//	Payment     *big.Int
//	Data        []byte
//}
//
//func PairedDepkoymentData(data []byte) []byte {
//	ret := make([]byte, 0)
//	ret = append(ret, math.U256Bytes() math.U256Bytes(b.MaxGas)...)
//	ret = append(ret, math.U256Bytes(b.GasPriceBid)...)
//	ret = append(ret, addressData(b.DestAddress)...)
//	ret = append(ret, math.U256Bytes(b.Payment)...)
//	ret = append(ret, data...)
//	return ret
//}

type L2Message struct {
	Data []byte
}

func (l L2Message) Type() Type {
	return L2Type
}

func (l L2Message) AsData() []byte {
	return l.Data
}
