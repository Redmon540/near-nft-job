import React, { useState, useEffect } from "react";
import Image from "next/image";

import { transactions } from "near-api-js";
import { login, logout } from "near/utils";

import { useSupplyContext } from "context/SupplyContext";

const BN = require("bn.js");
// ----------------------------------------------------------

export default function Mint() {
  
  const { totalSupply } = useSupplyContext();
  const [mintable, setMintable] = useState(5777);

  useEffect(() => {
    setMintable(5777 - totalSupply);
  }, [totalSupply]);

  let num:any = 0;
  let temp:any;
  let role:any;

  const selectRole = () => {
    let select: string = (document.getElementById("nfts") as HTMLInputElement).value;
    
    if (select == ""){
      temp = "none";
      document.getElementsByClassName("nftNone").[0].style.display = "block";
      document.getElementsByClassName("nftDeveloper")[0].style.display = "none";
      document.getElementsByClassName("nftArtist")[0].style.display = "none";
      document.getElementsByClassName("nftDesigner")[0].style.display = "none";
    } else if (select == "developer"){
      temp = "developer";
      document.getElementsByClassName("nftDeveloper").[0].style.display = "block";
      document.getElementsByClassName("nftNone")[0].style.display = "none";
      document.getElementsByClassName("nftArtist")[0].style.display = "none";
      document.getElementsByClassName("nftDesigner")[0].style.display = "none";
    } else if (select == "artist"){
      temp = "artist";
      document.getElementsByClassName("nftArtist")[0].style.display = "block";
      document.getElementsByClassName("nftNone")[0].style.display = "none";
      document.getElementsByClassName("nftDeveloper")[0].style.display = "none";
      document.getElementsByClassName("nftDesigner")[0].style.display = "none";
    } else if (select == "designer"){
      temp = "designer";
      document.getElementsByClassName("nftDesigner")[0].style.display = "block";
      document.getElementsByClassName("nftNone")[0].style.display = "none";
      document.getElementsByClassName("nftDeveloper")[0].style.display = "none";
      document.getElementsByClassName("nftArtist")[0].style.display = "none";
    }
  }
  

  async function mintNFT() {
    role = temp;
    let status = window?.walletConnection?.isSignedIn()
    if (status == true){
      if (role == "none"){
        alert("Please Select NFT");
      } else {
        num = localStorage.getItem("mintnum");
        num = Number(num) +1;
        localStorage.setItem("mintnum", num); 
        
        let content = [];
        for (let i = 0; i < 1; i++){
          content[i] = transactions.functionCall(
            "nft_mint",
            Buffer.from(JSON.stringify({role:role})),
            3000000000000,
            new BN("4000000000000000000000000")
          );
        }
        await window.contract.account.signAndSendTransaction({
          receiverId: window.contract.contractId,
          actions: content,
        });
      }
    } else {
      alert("Please connect Wallet");
    }
  }

  return (
    <div>
        <div className="row header" style={{textAlign:"center", marginBottom:"100px", marginTop:"20px"}}>
          <div className="col-lg-5"></div>
          <div className="col-lg-1">
            <h2><a href="/">MINT</a></h2>
          </div>
          <div className="col-lg-1">
            <h2><a href="/Job">JOBS</a></h2>
          </div>
        </div>
        <div style={{textAlign:"center", marginBottom:"100px", marginTop:"20px"}}>
          <button style={{width:"200px", height:"50px", borderRadius:"10px", cursor:"pointer"}} onClick={window?.walletConnection?.isSignedIn() ? logout : login}>
            {window?.walletConnection?.isSignedIn()
              ? window.accountId.substr(0, 5) +
                "..." +
                window.accountId.substr(
                  window.accountId.length - 4,
                  window.accountId.length
                )
              : "Wallet Connect"}
          </button>
        </div>
        <div className="header" style={{textAlign:"center", marginBottom:"100px"}}>
            <select name = "nfts" id="nfts" onChange={selectRole} style={{width:"200px", height:"30px", cursor:"pointer", textAlign:"center"}}>
              <option value="">Please Select Titled NFT</option>
              <option id="developer" value="developer">Developer</option>
              <option id="artist" value="artist">Artist</option>
              <option id="designer" value="designer">Designer</option>
            </select>
        </div>
        <div className="nftNone" style={{textAlign:"center", marginBottom:"50px"}}>
          <h2>Please Select NFT Title</h2>
        </div>
        <div className="nftDeveloper" style={{textAlign:"center", marginBottom:"50px", display:"none"}}>
            <div className="metadatname">
                <h2>Developer</h2>
            </div>
            <div className="imagenft">
                <img src= "assets/png/developer.png" />
            </div>
        </div>
        <div className="nftArtist" style={{textAlign:"center", marginBottom:"50px", display:"none"}}>
            <div className="metadatname">
                <h2>Artist</h2>
            </div>
            <div className="imagenft">
                <img src= "assets/png/artist.png" />
            </div>
        </div>
        <div className="nftDesigner" style={{textAlign:"center", marginBottom:"50px", display:"none"}}>
            <div className="metadatname">
                <h2>Designer</h2>
            </div>
            <div className="imagenft">
                <img src= "assets/png/designer.png" />
            </div>
        </div>
        <div className="mint" style={{textAlign:"center"}}>
            <button style={{width:"200px", height:"50px", borderRadius:"10px", cursor:"pointer"}} onClick={mintNFT}>MINT</button>
        </div>
    </div>
  );
}
