import { asset } from "eos-common";
import { rpc } from "./config";
import { get_settings, get_fee } from "../";

(async () => {
    const code = "swap.sx";
    const settings = await get_settings( rpc, code );

    const quantity = asset("10.0000 EOS");
    const fee = get_fee( quantity, settings );

    console.log(quantity.to_string(), "=>", fee.to_string());
})();
