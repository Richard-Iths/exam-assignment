import { Expose } from 'class-transformer'
import { IsInt, IsNumber } from 'class-validator'
import { IOrderArticle, IOrderRow } from '../../types'
type BaseOrderRow = Partial<IOrderRow>
export class PostOrderRowDto implements BaseOrderRow {
  @Expose()
  @IsNumber()
  amount!: number
  @Expose()
  @IsInt()
  orderArtId!: number
}

export class PatchOrderRowDto implements BaseOrderRow {
  @Expose()
  @IsNumber()
  id!: number
  @Expose()
  @IsNumber()
  amount!: number
  @Expose()
  @IsInt()
  orderArtId!: number
  @Expose()
  @IsInt()
  orderId!: number
}
export class DeleteOrderRowDto implements BaseOrderRow {
  @Expose()
  @IsNumber()
  id!: number
  @Expose()
  @IsNumber()
  orderId!: number
}
