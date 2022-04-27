import { Contains, IsEnum, IsInt, IsOptional, IsIn } from 'class-validator'
import { IOrder, OrderStatus } from '../../types'
import BaseDto from './baseDto'
type BaseOrderDto = Pick<IOrder, 'customerRef' | 'status' | 'empRef'>
export class CreateOrderDto extends BaseDto implements BaseOrderDto {
  @IsInt()
  customerRef: number
  @IsEnum(OrderStatus)
  @Contains(OrderStatus.PENDING)
  status: OrderStatus
  @IsInt()
  @IsOptional()
  empRef: number
}

export class PatchOrderDto implements BaseOrderDto {
  @IsInt()
  @IsOptional()
  customerRef: number
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus
  @IsInt()
  @IsOptional()
  empRef: number
}
