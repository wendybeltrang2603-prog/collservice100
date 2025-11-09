import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seccion1 from "@/components/Seccion1";
import Seccion2 from "@/components/Seccion2";
import Seccion3 from "@/components/Seccion3";
import ChatLauncher from "../components/ChatLauncher";

const inter = Inter({ subsets: ["latin"] });

export default function IndexPage() {
  const defaultEmployee = { id: "servicio", nombre: "Servicio de limpieza" }; // opcional, cambia según necesites

  return (
    <div className={styles.container}>
      <Head>
        <title>Tu sitio web</title>
        <meta name="description" content="Descripción de tu sitio web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* coloca launcher al inicio para que quede en la parte superior */}
      <ChatLauncher defaultEmployee={defaultEmployee} />

      <main className={styles.main}>
        <Seccion1 />
        <Seccion2 />
        <Seccion3 />
      </main>

      <Footer />
    </div>
  );
}