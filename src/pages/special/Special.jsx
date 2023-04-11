import React from 'react'
import SpecialCSS from "./Special.module.css"
import pappaChilli from "../../images/pappa chilli.jpg"
import policeLine from "../../images/police line.jpeg"
import mammaChilli from "../../images/mama chilli.jpeg"
import littleChilli from "../../images/little chilli.jpg"

function Special() {
  return (
    <div className={SpecialCSS.article}>
    <h3 className={SpecialCSS.news_title}><em>Breaking News</em></h3>
    <img className={SpecialCSS.image} src={policeLine}/>
    <p className={SpecialCSS.paragraph}>It has been reported that Chilli, a beloved pig from a local family of farmers, has gone missing. Despite their exhaustive search, the family has been unable to locate their treasured member.</p>
    <p className={SpecialCSS.paragraph}>The pig family named Chilli has been a staple of the community for years, winning several awards at local livestock shows and bringing joy to all those who encountered them. The disappearance of Chilli has left many devastated and disappointed in the idea of a world without this beloved animal.</p>
    <img className={SpecialCSS.image_pappa} src={pappaChilli}/>
    <p className={SpecialCSS.paragraph}>The family has been active in their pursuit of Chilli, canvassing the entire area and even enlisting the help of fellow farmers and local law enforcement. Despite their combined efforts, their search has yet to prove fruitful.</p>
    <p className={SpecialCSS.paragraph}>The community has banded together in an effort to support the family during this trying time. There have been numerous rallies, vigils, and social media posts calling for the return of Chilli. Even local celebrities and politicians have expressed their concern and hope for the safe return of the beloved pig.</p>
    <div>
      <img className={SpecialCSS.image_family} src={mammaChilli}/>
      <img className={SpecialCSS.image_family} src={littleChilli}/>
    </div>
    <p className={SpecialCSS.paragraph}>As the search for Chilli continues, the community remains hopeful that the family will soon be reunited with their missing member. Until then, they continue to offer their unwavering support and love for this cherished pig and the family that cares for them.</p>

    </div>
  )
}

export default Special