import { SymbolCode, Asset, asset_to_number } from "eos-common";
import { Pools, Settings } from "./interfaces";
import { get_uppers } from "./get_price";
import { get_price } from "./get_price";
import { get_fee } from "./get_fee";

export function get_slippage( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): number {
    const _quantity = new Asset( quantity );

    const fee = get_fee( _quantity, settings );
    const price = asset_to_number( get_price( Asset.minus( _quantity, fee ), symcode, pools, settings.amplifier ) );

    // calculate price using 1 as unit
    const [ base_upper, quote_upper ] = get_uppers( _quantity.symbol.code(), new SymbolCode(symcode), pools, settings.amplifier )
    const min_price = quote_upper / base_upper * asset_to_number( _quantity );

    return Number(( min_price / price - 1).toFixed(4));
}