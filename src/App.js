import './App.css';
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';
import CreateWallet from './pages/create_wallet/CreateWallet';
import SaveText from "./pages/save_text/SaveText";
import {useEffect, useState} from "react";
import CreatePuzzle from "./pages/create_puzzle/CreatePuzzle";

function App() {
    // Or manually specify a host
    // const arweave = Arweave.init({
    //     host: '127.0.0.1',
    //     port: 1984,
    //     protocol: 'http'
    // });

    let [arweave, setArWeave] = useState(null)
    useEffect( () => {
        let arweave = Arweave.init({
            host: '127.0.0.1',
            port: 1984,
            protocol: 'http',
            timeout: 20000,
            logging: false,
        })

        setArWeave(arweave)

        // TestWeave.init(arweave).then((testArweave)=>{
        //     console.log("Test-Weave running...")
        //     setArWeave(testArweave)
        // })

    },[])


    let key_json = {"kty":"RSA","e":"AQAB","n":"vH-oWW8tqx35tt8VwJFPPPqlhOQU-a2ySE7EzyE1AZoH913JR2iY0h72Pn7tukCRHS9PG6Vkb1EzNMFkhd7TToYl7GllAhLfkv9nCJyrFf2pPPWg7gC1KYSXXf451nfzkz9RdIGOQ8xC8m2JpEPWD-4cZWjP8w82eeQGvJW4kjQ3nCAk5xtg59CuDyGtn7_RH9eMEa_AD8rHQHccBi4Hz0jN-19E5L9y30gMLDzZIiaj1Z0QxbSIgKhR2Qi_-W8OIeKqmCOGjzZKWeMGPsNqxZEEmD0_IGH26X_xdLw5kWjLqJnkJi2UF4Fr_vxSMTZf5gSBha9JsBTL7C9B2g1zXhyzt8XH1z2-PXda2gv4Dx3IPIv1RGmv_Q0soIVGDLyyNdI2QksofwqFK5YsTcxemq5bJ2k608c5r44g4qt3x4OmWCe6u-37R3hQ3c-YB-MVJbfHujqDN7NY_pts8AMOu0Fuaq7UxGUtTosme0dO5KNhy2fgkNZ8Es92T9mb7w_ghNlcqNWQVwg1RrNhbrF3L66ygxRU7v-INfM7_emqjtypYeVrpIy4-V8xKcNIgRFmFL48asOfi3cPwz70Ek5bWeI5dED_yZUdXgfz532qr3NIc5bwnogktJtksNHu6PeeDVUXRRnN-J4CkM-V5RlDISvP_plOtytVxcYsEKwwLNk","d":"CGY20e9gjVKrXSDxJvDCo2C2zeZc4ehBvLOX1PPxmPXsW3MoJCCuyJQdHFlLDgTRAogoYf67bDNl0Pi6GjX82--h0ng6yj4djL8JMArNG9B_AUqfpmNNL0GrfgJ1QM99AMduQX8BYBeCtys22iU0rWaKiOFD_NxlbMaCn1YbkJY3kSMkidDAP2weyWlSg38IWj8gTGx0pi9-s-pqywKzkeK4XPZYi0nVnEnpUvJOKZWnsL3MMMcT2wnFBeL8LOjsLAnd2KQim5CLfRhe356VDCMjXYZDIRYEatCq6Wz2srpE8ukSj7nxsp9veL_1CKDX4pe6TsLqCWjP0mEjscvuI0R8-UaREc7cr0iuKhMOHaJCIS1LKfhWHI2M2Eez4zLFYjyKiljo7ourtlcUOIXiX1ihcHpcs60EuSWuVc-FErARpsSW-24GnxBVLf7emDgP7yHteSRdHgKz49GQbf7eJlAlV23jE6LQCbmKQdQUlyLfyEmY-jE-6oz2a3WUOxg641sUXrutxhz1c-fKaCYcghQkUFOyh_dSD8tG8DcEZCWsP3dizZUH8LaosR_z2VyTSTFlkILe4makKI6UkVzdGRmUxp-PvTHambP_tEEaj20jjOzkoXlyvpv8jBOrMKocfiNo8KOZBUQgRX-MRsVb0_9zrwWJ8jnQguDXC4Pa5HU","p":"8620nYo0ajwcD9SpeVJPkn6cgelmGeBek-1JiQLWEUq7ohrmnibQ3EmvqTL9ynjnxiy1nC8r0M1anEfRd-0rhuV0mOHXFknBefX_HAlimKZP96kBBdJXi4ZWicJ13rsjdmqo4cK8mZ3zZUauCU8ExZIq7c-wF7wC8_GcNTzkwYOd-L9KGx8EfN5pulDV6WZcRvRDxWTFv_7_WLy0KJo3MDF08q2urhcLZF7ch_VkkY7T7OkzzsDzIJEJ92wGuXlqyMTnOalgkDJYiuk3QP_vKp1ziZ7xAjAOrMq1jAsQ7BEhZNRHnu0kYuqf5NrNn1E0l-KKpldoNE9W3m3J0ntKzQ","q":"xgetPkIHu6-z7JotOO3KjpLlUn4SNWrFiRoCigWjckMePDlZUDCmb257Q7vUU5vo3RxauA5ka5g3BBVhbSWPBcZncueINAVSc4o-zGbngcd3w-FaTV4Q-mZeN2ImOL1MruILMwt0IqN-Vo0UovkrzupUBcz0-dN5sz1OdNGlNhp9M5zLcu4sf-_vmh6bPAf0gc-FENdAE195ri3knbRCXaVjkUIdxW1gLMxQ0DOtoiBXWmiXPShL5JIftykF0t0_Riy25wBu-OHbB1FHhIBzYqPwCVNPrB0wBqbGXvXZ_brKrb1uH-Qmd-3JLWAAyBEOrSimciAG54gdZBnarqDCPQ","dp":"8BY2vX2c9Qqyb1qNe-6AXgsHMux-X4J0TPVfHXJA7hqe0jIFBM-ju1eSjneiHCqR2ezVJsRHPFwIKbCNDscLusY64iKpo9kZmouoRbxte49pfM70JgM_pEXA38xMDB5_6z1dlcojvoskc6V29c74GZ1RVKvriQcCNc3YpY-Qp6WBMMNwRVaDOnB85Uid6m-i_XnPiB4oxGl-trR-IP8I3x_rZOuBDx-_Zq4cRIygANYjsel21P_AzFZ65l92JKofbx6p32MltA0Wtg7gFNfVkjw9yNtkBE7LNq4mv4trqdua9lg9FLX7wsX-siJus8jzs65OA2RdVCTTpyWu0wYNBQ","dq":"xMID5AP_YwBkqQVXQWUjCR3zNE-HEAQSWPK66yBHEdSWSghBMWflNnpzhw0tHhWe_XKawJ2sMSuAHlKQBr52qKpFRum9btKK5bnKQ5VLGKtz1_AkpRJ9lA36NtUSXPXZJzn5HrKWpYQEl0J96p_gYyp4aXsHPOJd3TVgqrlSibswAwQbMQpstIFVc7BNVQwiaIgkEmOMirMmV2XJ7NeZySn3D_C9W9gc4uXuta9jKd8wa-fXvTA4l9aIJJhh7O1fXP44jLTljev6j_62LHTkMHHqoZlhZAVsHm--UcO84Fmj35SDwrQRdL-ST78_h4lLJ8ln96TSt2GKslbt7OxVkQ","qi":"edSlp93g8j5d9KDc3wMlN36dA2pXQl8sZF4rvxXZNsFpg0D8VFeHuzei7n6Ii8wy0XXJKqErw1RxRStJjH6iJvkE-oqbCLIDvPToQj0ov2XrNy_m0KtGmfXDJX9Epef0NkDxxToUYiPCmeMAr9gxFyLCHjjvvI5BNXgaJZQvXj6ZzTiDnxKQ4SUOzQ4IsE-avEQEaFV4oRIQGK_qkEq6LI-uKaFjj2bJoIWTH3q4L_9za94a2SXdSiBYCEKOhQFT59ZFAFPoPVC8TMgdFGYLedrEupDbS9-qa1c7UHG5gKUG99A7uso9u1BJQC6ekik25OCFRiyWUpnlONIQb4LPTg"}

  return (
    <div>
      Test CreateWallet <CreateWallet arweave={arweave} />
      Test SaveText <SaveText arweave={arweave} key_json={key_json} />
      <CreatePuzzle arweave={arweave} key_json={key_json} />
    </div>

  );
}

export default App;
