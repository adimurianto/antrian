"use client";

import { useEffect, useState } from "react";
import { antrians, sesiAntrian } from "../dataAntrian";

export default function Antrian() {
    const initialValues = {
        noAntrian: "0",
        nama: "",
        poli: "",
        dokter: "",
        sesi: "",
        status: "Tersedia"
    }

    const [listAntrian, setListAntrian] = useState<any>([]);
    const [dataSelected, setDataSelected] = useState<any>(initialValues);

    const [namaAntrian, setNamaAntrian] = useState("");
    const [poliAntrian, setPoliAntrian] = useState("");
    const [dokterAntrian, setDokterAntrian] = useState("");

    const getColor = (status: string) => {
        if(status == "Tidak Tersedia"){
            return "#bdbdbd"
        }else if(status == "Tersedia"){
            return "#f2f2f2"
        }else{
            return "#e65956"
        }
    }

    useEffect(() => {
        let dataAntrian:any = []
        if(!localStorage?.getItem("lists_antrian")) {
            dataAntrian = JSON.stringify(antrians);
            localStorage.setItem("lists_antrian", dataAntrian)
        }else{
            dataAntrian = localStorage.getItem("lists_antrian");
        }

        dataAntrian = JSON.parse(dataAntrian);
        setListAntrian(dataAntrian)
    }, [])

    useEffect(() => {
        setNamaAntrian("")
        setPoliAntrian("")
        setDokterAntrian("")
    }, [dataSelected])

    const actBatal = (noAntrian: string) => {
        if(dataSelected?.status == "Tersedia") {
            alert("Antrian tersebut masih tersedia")
        }else if(dataSelected?.status == "Batal") {
            alert("Antrian tersebut sudah dibatalkan")
        }else{
            const dataAntrian = [...listAntrian]
    
            const newDataAntrian: any = [];
            dataAntrian?.map((dt: any) => {
                let dataSet:any = {};
                if(dt?.noAntrian == noAntrian) {
                    dataSet = {
                        noAntrian: dt?.noAntrian,
                        nama: dt?.nama,
                        poli: dt?.poli,
                        dokter: dt?.dokter,
                        sesi: dt?.sesi,
                        status: "Batal"
                    }
                }else{
                    dataSet = {
                        noAntrian: dt?.noAntrian,
                        nama: dt?.nama,
                        poli: dt?.poli,
                        dokter: dt?.dokter,
                        sesi: dt?.sesi,
                        status: dt?.status
                    }
                }
    
                newDataAntrian.push(dataSet)
            });
    
            const rebuildData = JSON.stringify(newDataAntrian)
            localStorage?.setItem("lists_antrian", rebuildData)
    
            setListAntrian(newDataAntrian)
    
            const reSelectData = {
                noAntrian: dataSelected?.noAntrian,
                nama: dataSelected?.nama,
                poli: dataSelected?.poli,
                dokter: dataSelected?.dokter,
                sesi: dataSelected?.sesi,
                status: "Batal"
            }
    
            setDataSelected(reSelectData)

            alert("Antrian berhasil dibatalkan")
        }
    }

    const actDaftar = (noAntrian: string) => {
        if(dataSelected?.status !== "Tersedia") {
            alert("Antrian tersebut sudah tidak tersedia")
        }else{
            const dataAntrian = [...listAntrian]

            const newDataAntrian: any = [];
            dataAntrian?.map((dt: any) => {
                let dataSet:any = {};
                if(dt?.noAntrian == noAntrian) {
                    dataSet = {
                        noAntrian: dt?.noAntrian,
                        nama: namaAntrian,
                        poli: poliAntrian,
                        dokter: dokterAntrian,
                        sesi: dt?.sesi,
                        status: "Tidak Tersedia"
                    }
                }else{
                    dataSet = {
                        noAntrian: dt?.noAntrian,
                        nama: dt?.nama,
                        poli: dt?.poli,
                        dokter: dt?.dokter,
                        sesi: dt?.sesi,
                        status: dt?.status
                    }
                }

                newDataAntrian.push(dataSet)
            });

            const rebuildData = JSON.stringify(newDataAntrian)
            localStorage?.setItem("lists_antrian", rebuildData)

            setListAntrian(newDataAntrian)

            const reSelectData = {
                noAntrian: dataSelected?.noAntrian,
                nama: namaAntrian,
                poli: poliAntrian,
                dokter: dokterAntrian,
                sesi: dataSelected?.sesi,
                status: "Tidak Tersedia"
            }

            setDataSelected(reSelectData)

            alert("Antrian berhasil diisi")
        }
    }

    const selectData = (noAntrian: string) => {
        const data = listAntrian?.filter((item: any) => item?.noAntrian == noAntrian)[0];
        if(data) {
            const setValues = {
                noAntrian: data?.noAntrian,
                nama: data?.nama,
                poli: data?.poli,
                dokter: data?.dokter,
                status: data?.status
            }

            setDataSelected(setValues);
        }
    }

    return (
        <>
            <div style={{width: "70%", float: "left"}}>
                {
                    sesiAntrian ?
                        sesiAntrian?.map((sesi: any) => {
                            return (
                                <div key={sesi} className="text-black">
                                    <span style={{margin: "1rem 0", fontWeight: "bolder"}}>Sesi {sesi}</span>
                                    <div className="dataSesi">
                                        {
                                            listAntrian && listAntrian?.filter((dt: any) => dt?.sesi == sesi)?.length > 0 ?
                                                listAntrian?.filter((dt: any) => dt?.sesi == sesi)?.map((item: any) => {
                                                return (
                                                    <div key={sesi+"-"+item?.noAntrian} style={{padding: "0.25rem", width: "10%", float: "left"}}>
                                                        <button
                                                            style={{
                                                                backgroundColor: dataSelected?.noAntrian == item?.noAntrian ? "#24a0a9" : getColor(item?.status ?? ""), 
                                                                padding: "2rem", 
                                                                borderRadius: "5px", 
                                                                fontWeight: "bolder"
                                                            }}
                                                            onClick={() => {
                                                                selectData(item?.noAntrian)
                                                            }}
                                                        >
                                                            {item?.noAntrian}
                                                        </button>
                                                    </div>
                                                )
                                                })
                                            :
                                                <div><center>Data Antrian Kosong</center></div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    : <div><center>Sesi Antrian Kosong</center></div>
                }
            </div>

            <div style={{width: "30%", float: "left"}}>
                <div style={{padding: "2rem"}} className="text-black">
                    <div style={{width: "100%", paddingBottom: "2.5rem"}}>
                        <span style={{width: "30%", display: "block", float: "left"}}>
                            Nama
                        </span>
                        <span style={{width: "70%", display: "block", float: "left"}}>
                            :
                            {
                                dataSelected?.status == "Tersedia" && dataSelected?.noAntrian !== "0" ?
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        <input 
                                            style={{border: "1px solid black", padding: "2px 5px", borderRadius: "3px"}} 
                                            type="text" 
                                            onKeyUp={(e: any) => {
                                                setNamaAntrian(e?.currentTarget?.value)
                                            }}
                                        />
                                    </>
                                : 
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        {dataSelected?.nama}
                                    </>
                            }
                        </span>
                    </div>
                    <div style={{width: "100%", paddingBottom: "2.5rem"}}>
                        <span style={{width: "30%", display: "block", float: "left"}}>
                            Poli
                        </span>
                        <span style={{width: "70%", display: "block", float: "left"}}>
                            :
                            {
                                dataSelected?.status == "Tersedia" && dataSelected?.noAntrian !== "0" ?
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        <input 
                                            style={{border: "1px solid black", padding: "2px 5px", borderRadius: "3px"}} 
                                            type="text" 
                                            onKeyUp={(e: any) => {
                                                setPoliAntrian(e?.currentTarget?.value)
                                            }}
                                        />
                                    </>
                                : 
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        {dataSelected?.poli}
                                    </>
                            }
                        </span>
                    </div>
                    <div style={{width: "100%", paddingBottom: "2.5rem"}}>
                        <span style={{width: "30%", display: "block", float: "left"}}>
                            Dokter
                        </span>
                        <span style={{width: "70%", display: "block", float: "left"}}>
                            :
                            {
                                dataSelected?.status == "Tersedia" && dataSelected?.noAntrian !== "0" ?
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        <input 
                                            style={{border: "1px solid black", padding: "2px 5px", borderRadius: "3px"}} 
                                            type="text" 
                                            onKeyUp={(e: any) => {
                                                setDokterAntrian(e?.currentTarget?.value)
                                            }}
                                        />
                                    </>
                                : 
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        {dataSelected?.dokter}
                                    </>
                            }
                        </span>
                    </div>
                    <div style={{width: "100%", paddingBottom: "2.5rem"}}>
                        <span style={{width: "30%", display: "block", float: "left"}}>
                            No Antrian
                        </span>
                        <span style={{width: "70%", display: "block", float: "left"}}>
                            :
                            &nbsp;&nbsp;&nbsp;
                            {dataSelected?.noAntrian}
                        </span>
                    </div>
                    
                    <hr/><br/>
                    
                    <i>Status Antrian :</i><br/>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <button style={{width: "2rem", height: "2rem", borderRadius: "5px", backgroundColor: "#f2f2f2", margin: "0.3rem 0.5rem", cursor: "unset"}}></button>
                        <span>Tersedia</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <button style={{width: "2rem", height: "2rem", borderRadius: "5px", backgroundColor: "#24a0a9", margin: "0.3rem 0.5rem", cursor: "unset"}}></button>
                        <span>Terpilih</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <button style={{width: "2rem", height: "2rem", borderRadius: "5px", backgroundColor: "#e65956", margin: "0.3rem 0.5rem", cursor: "unset"}}></button>
                        <span>Batal</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <button style={{width: "2rem", height: "2rem", borderRadius: "5px", backgroundColor: "#bdbdbd", margin: "0.3rem 0.5rem", cursor: "unset"}}></button>
                        <span>Tidak Tersedia</span>
                    </div>
                    <br/><br/>


                    <button style={{padding: "0.25rem 2rem", margin: "1rem", background: "#e65956", color: "white", borderRadius: "5px"}}
                    onClick={() => {
                        actBatal(dataSelected?.noAntrian)
                    }}>Batal</button>
                    <button style={{padding: "0.25rem 2rem", margin: "1rem", background: "green", color: "white", borderRadius: "5px"}}
                    onClick={() => {
                        actDaftar(dataSelected?.noAntrian)
                    }}>Daftar</button>
                </div>
            </div>
        </>
    )
}