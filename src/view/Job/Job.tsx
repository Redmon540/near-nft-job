import React , {useState, useEffect, useCallback} from 'react';
import { initContract } from "near/utils";
import { title } from 'process';

async function Get() {
    let status = window?.walletConnection?.isSignedIn();
    let data = await window.contract.account;
    console.log(data);
}
interface joblist {
    "title": string,
    "content": string
}

export default function Job() {

    const [inited, setInited] = useState(false);
    const [totalToken, settotalToken] = useState(0);
    const [nftTitle, setNftTitle] = useState();
    const [title, setTitle] = useState(null);
    
    const [mdevlist, setDevList] = useState<joblist[]>([]);
    useEffect(() => {
        window.nearInitPromise = initContract()
          .then(() => setInited(true))
          .catch(console.error);
    }, []);

    const getNFTToken = useCallback(async () => {
        const tokens = await window?.contract?.nft_tokens_for_owner({account_id:"degenpigtest.testnet", from_index:"1", limit:5000});
        const numtokens:any = tokens.length;
        const nftTitle = tokens[numtokens-1].metadata.title;
        var titlesum = nftTitle.split(" #");
        const title:any = titlesum[0];
        setTitle(title);
        setNftTitle(nftTitle);
        settotalToken(tokens);
    }, []);

    var joblist = [
        {title:"Developer", content:"have need to developer website"},
        {title:"Designer", content:"have need to design figma"},
        {title:"Developer", content:"have need to blockchain website"},
        {title:"Artist", content:"have need to make nfts"}
    ];

    const filter = (jtitle:any) => {
        console.log("title",jtitle, typeof(jtitle));
        const devlist = joblist.filter(x=>x.title == jtitle);
        setDevList(devlist);
    }

    useEffect(() => {
        getNFTToken();
      }, []);

    
    return(
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
            <div style={{textAlign:"center", marginBottom:"50px"}}>
                <h1>JOBS</h1>
            </div>
            <div className='row' style={{marginBottom:"50px"}}>
                <div className='col-lg-4'>
                    <div><h3>NFT METADATA NAME IN WALLET</h3></div>
                    <div><h2>{nftTitle}</h2></div>
                </div>
                <div className='col-lg-2'>
                    <div><h3>Title</h3></div>
                    <div>
                        { joblist.map((list, index) => (
                            <div className="dd" key={index}>
                                <h4>{list.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div><h3>Description</h3></div>
                    <div>
                        { joblist.map((list, index) => (
                            <div className="dd" key={index}>
                                <h4>{list.content}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{textAlign:"center", marginBottom:"50px"}}>
                <button onClick={() => filter(title)}>FILTER BY NFT TITLE</button>
            </div>
            <div className='row' style={{marginBottom:"50px"}}>
                <div className='col-lg-4'></div>
                <div className='col-lg-2'>
                    <div><h3>Title</h3></div>
                    <div>
                        { mdevlist.map((list, index) => (
                            <div className="dd" key={index}>
                                <h4>{list.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div><h3>Description</h3></div>
                    <div>
                        { mdevlist.map((list, index) => (
                            <div className="dd" key={index}>
                                <h4>{list.content}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}