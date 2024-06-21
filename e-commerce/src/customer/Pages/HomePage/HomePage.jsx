import React, { useEffect } from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from './../../../data/mens_kurta';
import { mensShoesPage1 } from '../../../data/shoes';
import { gounsPage1 } from '../../../data/Gouns/gouns';
import { mensPantsPage1 } from '../../../data/pants/men_page1';
import { lengha_page1 } from './../../../data/Women/LenghaCholi';
import { sareePage1 } from './../../../data/Saree/page1';




const HomePage = () => {




  return (
    <div>
      <MainCarousel/>
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
       
         
         <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
         <HomeSectionCarousel data={lengha_page1} sectionName={"Women's Lehanga"} />
         <HomeSectionCarousel data={mensPantsPage1} sectionName={"Men's Pant"} />
         <HomeSectionCarousel data={sareePage1} sectionName={"Women's Saree"} />
         <HomeSectionCarousel data={gounsPage1} sectionName={"Women' Gouns"} />
         
         
      </div>
    </div>
  )
}

export default HomePage