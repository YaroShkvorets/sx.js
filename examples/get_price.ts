import { asset } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_price, get_fee, get_settings } from "..";
import { get_inverse_price } from "../src/get_price";

(async () => {
    // settings
    const pools = await get_pools( rpc, { code: "stablestable" });
    const settings = await get_settings( rpc, { code: "stablestable" });

    // out quantity
    const quantity = asset("200.0000 USDT");
    const fee = get_fee( quantity, settings );
    const in_quantity = asset(quantity.amount - fee.amount, quantity.symbol);

    // calculate
    const out = get_price( in_quantity, "EOSDT", pools );
    const inverse = get_inverse_price( out, "USDT", pools );
    inverse.amount += fee.amount;

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("in_quantity:", in_quantity.to_string());
    console.log("fee:", fee.to_string());
    console.log("out:", out.to_string());
    console.log("inverse:", inverse.to_string());
})();
