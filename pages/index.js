import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import HeaderBottom from "../components/headerBottom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container">
        <HeaderBottom />
      </div>
    </Layout>
  );
}
