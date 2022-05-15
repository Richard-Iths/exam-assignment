import { Contains, IsEnum, IsInt, IsOptional, IsIn, IsString, MinLength } from 'class-validator'
import { IOrder, OrderStatus } from '../../types'
type BaseOrderDto = Pick<IOrder, 'customerRef' | 'status' | 'empRef' | 'description'>
export class CreateOrderDto implements BaseOrderDto {
  @IsInt()
  customerRef: number
  @IsEnum(OrderStatus)
  @Contains(OrderStatus.PENDING)
  status: OrderStatus
  @IsInt()
  @IsOptional()
  empRef: number
  @IsString()
  @MinLength(5)
  description: string
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
  @IsString()
  @IsOptional()
  @MinLength(5)
  description: string
}
