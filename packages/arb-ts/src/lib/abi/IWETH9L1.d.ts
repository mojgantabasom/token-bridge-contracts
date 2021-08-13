/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import { TypedEventFilter, TypedEvent, TypedListener } from './commons'

interface IWETH9L1Interface extends ethers.utils.Interface {
  functions: {
    'allowance(address)': FunctionFragment
    'approve(address,uint256)': FunctionFragment
    'balanceOf(address)': FunctionFragment
    'deposit()': FunctionFragment
    'totalSupply()': FunctionFragment
    'transfer(address,uint256)': FunctionFragment
    'transferFrom(address,address,uint256)': FunctionFragment
    'withdraw(uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'allowance', values: [string]): string
  encodeFunctionData(
    functionFragment: 'approve',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string
  encodeFunctionData(functionFragment: 'deposit', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'totalSupply',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'transfer',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [string, string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'withdraw',
    values: [BigNumberish]
  ): string

  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'transferFrom',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result

  events: {
    'Approval(address,address,uint256)': EventFragment
    'Deposit(address,uint256)': EventFragment
    'Transfer(address,address,uint256)': EventFragment
    'Withdrawal(address,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Deposit'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Withdrawal'): EventFragment
}

export class IWETH9L1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: IWETH9L1Interface

  functions: {
    allowance(guy: string, overrides?: CallOverrides): Promise<[BigNumber]>

    approve(
      guy: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    balanceOf(guy: string, overrides?: CallOverrides): Promise<[BigNumber]>

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    transferFrom(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  allowance(guy: string, overrides?: CallOverrides): Promise<BigNumber>

  approve(
    guy: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  balanceOf(guy: string, overrides?: CallOverrides): Promise<BigNumber>

  deposit(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>

  transfer(
    dst: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  transferFrom(
    src: string,
    dst: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  withdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    allowance(guy: string, overrides?: CallOverrides): Promise<BigNumber>

    approve(
      guy: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>

    balanceOf(guy: string, overrides?: CallOverrides): Promise<BigNumber>

    deposit(overrides?: CallOverrides): Promise<void>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>

    transferFrom(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>

    withdraw(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>
  }

  filters: {
    Approval(
      src?: string | null,
      guy?: string | null,
      wad?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { src: string; guy: string; wad: BigNumber }
    >

    Deposit(
      dst?: string | null,
      wad?: null
    ): TypedEventFilter<[string, BigNumber], { dst: string; wad: BigNumber }>

    Transfer(
      src?: string | null,
      dst?: string | null,
      wad?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { src: string; dst: string; wad: BigNumber }
    >

    Withdrawal(
      src?: string | null,
      wad?: null
    ): TypedEventFilter<[string, BigNumber], { src: string; wad: BigNumber }>
  }

  estimateGas: {
    allowance(guy: string, overrides?: CallOverrides): Promise<BigNumber>

    approve(
      guy: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    balanceOf(guy: string, overrides?: CallOverrides): Promise<BigNumber>

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    transferFrom(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    allowance(
      guy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    approve(
      guy: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    balanceOf(
      guy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    transferFrom(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
