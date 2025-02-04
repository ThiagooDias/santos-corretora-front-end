import "./App.css";
import CardProperty from "./components/CardProperty";
import Header from "./components/Header"
import Hero from "./components/Hero";
import { useProperties } from "./hooks/useProperties";
import casa from "./assets/casa.jpg"
import SalesSection from "./components/SalesSection";
import Footer from "./components/Footer";

function App() {
  const {properties, loading} = useProperties()
  
  return (
    <>
      <Header></Header>

      <main className="bg-green-50">
        <Hero></Hero> 

        <SalesSection></SalesSection>

        {/* <div className="flex gap-10">
          <CardProperty title={'Casa espaçosa'} address={'Rua 102 Unidade 103, nº - Parque Ateneu - Paragominas-PA.'} businessType={'Venda'} type={'Apartamento'} image={casa} price={'R$ 300.000,00'}></CardProperty>

          <CardProperty title={'Casa espaçosa com piscina'} address={'Rua 102 Unidade 103, nº - Parque Ateneu - Paragominas-PA.'} businessType={'Venda'} type={'Apartamento'} image={casa} price={'R$ 300.000,00'}></CardProperty>

          <CardProperty title={'Casa espaçosa com piscinaaaaaaaaaaaaaaaaa'} address={'Rua 102 Unidade 103, nº - Parque Ateneu - Paragominas-PA.'} businessType={'Venda'} type={'Apartamento'} image={casa} price={'R$ 300.000,00'}></CardProperty>
        </div>
         */}
      </main>
      <Footer/>
    </>
  );
}

export default App;
