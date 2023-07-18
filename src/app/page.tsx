import Antrian from "./component/antrian"

export default async function Home() {
  return (
    <main className="p-2">
      <center>
        <h2 className="text-black font-bold">Silahkan Pilih No Antrian Anda</h2>
      </center>
      <Antrian />
    </main>
  )
}
