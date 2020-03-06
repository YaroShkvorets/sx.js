import { rpc } from "./config";
import { get_pools, get_settings, get_rate } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const quantity = "200.0000 USDT";
    const symcode = "EOSDT";
    const { price, fee } = get_rate( quantity, symcode, pools, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("symcode:", symcode );
    console.log("fee:", fee.to_string());
    console.log("price:", price.to_string());
})();
