"use client";

import { useEffect, useState } from "react";
import { antrians } from "../dataAntrian";

export default function Antrian() {
    const initialValues = {
        noAntrian: "0",
        nama: "",
        poli: "",
        dokter: "",
        status: "Tersedia"
    }

    const [listAntrian, setListAntrian] = useState<any>([]);
    const [dataSelected, setDataSelected] = useState<any>(initialValues);

    const getColor = (status: string) => {
        if(status == "Tidak Tersedia"){
        return "#bdbdbd"
        }else if(status == "Tersedia"){
        return "#f2f2f2"
        }else if(status == "Terpilih"){
        return "#24a0a9"
        }else{
        return "#e65956"
        }
    }

    useEffect(() => {
        let dataAntrian:any = []
        if(!localStorage?.getItem("list_antrian")) {
            dataAntrian = JSON.stringify(antrians);
            localStorage.setItem("list_antrian", dataAntrian)
        }else{
            dataAntrian = localStorage.getItem("list_antrian");
        }

        dataAntrian = JSON.parse(dataAntrian);
        setListAntrian(dataAntrian)
    }, [])

    const actBatal = (noAntrian: string) => {

    }
    const actDaftar = (noAntrian: string) => {
        
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
                <div className="text-black">
                    Sesi 1
                    <div className="dataSesi">
                        {
                        listAntrian ?
                            listAntrian?.map((item: any) => {
                            return (
                                <button 
                                key={item?.noAntrian}
                                style={{width: "10%", backgroundColor: getColor(item?.status), padding: "2rem", margin: "0.5rem", borderRadius: "5px", fontWeight: "bolder"}}
                                onClick={() => {
                                    selectData(item?.noAntrian)
                                }}
                                >
                                {item?.noAntrian}
                                </button>
                            )
                            })
                        :<div><center>Data Antrian Kosong</center></div>
                        }
                    </div>
                </div>
            </div>
            <div style={{width: "30%", float: "left"}}>
                <div style={{padding: "2rem"}} className="text-black">
                    Nama :&nbsp;
                    {
                        dataSelected?.nama == "" && dataSelected?.noAntrian !== "0" ?
                            <input style={{border: "1px solid black", padding: "2px"}} type="text" />
                            : dataSelected?.nama
                    }
                    <br/><br/>
                    Poli :&nbsp;
                    {
                        dataSelected?.poli == "" && dataSelected?.noAntrian !== "0" ?
                            <input style={{border: "1px solid black", padding: "2px"}} type="text" />
                            : dataSelected?.poli
                    }
                    <br/><br/>
                    Dokter :&nbsp;
                    {
                        dataSelected?.dokter == "" && dataSelected?.noAntrian !== "0" ?
                            <input style={{border: "1px solid black", padding: "2px"}} type="text" />
                            : dataSelected?.dokter
                    }
                    <br/><br/>
                    Status :&nbsp;
                    {
                        dataSelected?.status == "" && dataSelected?.noAntrian !== "0" ?
                            <input style={{border: "1px solid black", padding: "2px"}} type="text" />
                            : dataSelected?.status
                    }
                    <br/><br/>

                    <button style={{padding: "0.25rem 2rem", margin: "1rem", background: "red", color: "white", borderRadius: "5px"}}
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