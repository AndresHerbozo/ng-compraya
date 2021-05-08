import { ProductEffects } from './product.effects';
import { MasterDataEffects } from './masterdata.effects';
import { OrderEffects } from './order.effects';

export const CompraYaEffects: any[] = [
    MasterDataEffects,
    ProductEffects,
    OrderEffects
];