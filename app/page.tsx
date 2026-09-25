'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
const links = [['Serviços','servicos'],['Benefícios','beneficios'],['Para empresas','empresas'],['Como funciona','como-funciona']];
const services = [
 ['car','Transporte Executivo','Deslocamentos urbanos com conforto, segurança e atendimento profissional.'],
 ['plane','Transfer Aeroporto','Traslados de ida e volta para aeroportos, com planejamento de horário e trajeto.'],
 ['briefcase','Transporte Corporativo','Mobilidade para executivos, colaboradores, clientes e parceiros em compromissos profissionais.'],
 ['van','Eventos e Reuniões','Transporte para congressos, eventos corporativos, reuniões e compromissos especiais.'],
 ['road','Viagens e Deslocamentos','Atendimento para trajetos que exigem planejamento, conforto e confiabilidade.']
];
const benefits = [
 ['business','Atendimento corporativo','Uma experiência adequada à rotina e às necessidades da sua empresa.'],
 ['sparkles','Mais praticidade','Facilidade para organizar deslocamentos e compromissos.'],
 ['smile','Experiência para seus clientes','Receba parceiros e executivos com o padrão de atendimento que sua empresa deseja oferecer.'],
 ['timer','Otimização de tempo','Rotas planejadas para tornar os deslocamentos mais eficientes.']
];
const steps = [
 ['Solicite','Entre em contato com a Arion e informe seu destino, horário e necessidade.'],
 ['Planejamos','Avaliamos o trajeto e organizamos o atendimento de acordo com a sua solicitação.'],
 ['Confirmamos','Você recebe as informações da corrida e os detalhes necessários para o deslocamento.'],
 ['Chegue ao destino','Conte com uma experiência executiva planejada para que você possa aproveitar melhor o seu tempo.']
];
const cars = [
 ['Sedã / Corolla','Conforto e praticidade para deslocamentos individuais ou com poucos passageiros.'],
 ['SUV / Corolla Cross','Conforto, segurança e uma experiência executiva.'],
 ['SUV','Conforto, segurança e uma experiência executiva.'],
 ['Minivan / Spin','Conforto, segurança e uma experiência executiva.']
];
// Set only after the business provides its official contact destination.
const contactUrl: string | null = null;
function Icon({name,className=''}:{name:string;className?:string}){return <img className={'icon '+className} src={'/images/'+name+'.svg'} width="24" height="24" alt="" aria-hidden="true"/>}
function Contact({secondary=false,children}:{secondary?:boolean;children:React.ReactNode}){
 return contactUrl ? <a className={'button'+(secondary?' secondary':'')} href={contactUrl} target="_blank" rel="noopener noreferrer">{children}{secondary&&<Icon name="arrow"/>}</a> : <a className={'button'+(secondary?' secondary':'')} href="#contato">{children}{secondary&&<Icon name="arrow"/>}</a>;
}
function Actions(){return <div className="actions"><Contact>Solicitar serviço</Contact><Contact secondary>Falar com a Arion</Contact></div>}
export default function Home(){
 const [car,setCar]=useState(0);
 const pageRef=useRef<HTMLElement>(null);
 useEffect(()=>{
   const page=pageRef.current;
   if(!page || !('IntersectionObserver' in window)) return;
   const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
   const animations=new Set<Animation>();
   let observer:IntersectionObserver | undefined;
   const stop=()=>{observer?.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();};
   const start=()=>{
     stop();
     if(preference.matches) return;
     observer=new IntersectionObserver(entries=>{
       entries.forEach(entry=>{
         if(!entry.isIntersecting) return;
         const element=entry.target as HTMLElement;
         observer?.unobserve(element);
         // Animate once on entry; content stays visible without JavaScript.
         const siblings=element.parentElement;
         const stagger=siblings?.matches('.service-grid, .benefit-list, .steps, .mosaic');
         const index=stagger ? Array.from(siblings!.children).indexOf(element)%3 : 0;
         const animation=element.animate([
           {opacity:0,transform:'translateY(28px)'},
           {opacity:1,transform:'translateY(0)'}
         ],{duration:700,delay:index*85,easing:'cubic-bezier(0.22, 1, 0.36, 1)',fill:'backwards'});
         animations.add(animation);
         animation.onfinish=()=>animations.delete(animation);
       });
     },{threshold:0.08});
     page.querySelectorAll('.about-title, .about .wrap > p, .route-card > div, .section-title, .service, .fleet-stage, .fleet-caption, .comparison-content > h2, .comparison-content > p, .comparison-grid, .business-copy, .benefit-list > article, .mosaic > img, .steps > li, .footer .wrap > *').forEach(element=>observer!.observe(element));
   };
   start();
   preference.addEventListener('change',start);
   return ()=>{stop();preference.removeEventListener('change',start);};
 },[]);
 return <main id="inicio" ref={pageRef}>
 <a className="skip" href="#servicos">Pular para o conteúdo</a>
 <section className="hero" aria-labelledby="hero-title"><div className="hero-art" aria-hidden="true"/><div className="wrap"><header className="header"><a href="#inicio" aria-label="Arion — início"><img src="/images/Logo.webp" width="122" height="40" alt="Arion Transporte Executivo"/></a><nav aria-label="Navegação principal">{links.map(([label,id])=><a key={id} href={'#'+id}>{label}</a>)}</nav></header><div className="hero-content"><span className="badge"><i/>Táxi executivo</span><h1 id="hero-title"><strong>Mobilidade executiva</strong>{' '}<br/>para quem valoriza{' '}<br/>o próprio tempo.</h1><p>Transporte executivo com conforto, segurança e agilidade para deslocamentos corporativos, aeroportos, eventos e compromissos em sua rotina.</p><Actions/></div></div></section>
 <section className="about section"><div className="wrap"><div className="about-title"><img src="/images/Logo-2.webp" alt="" width="109" height="132" loading="lazy"/><h2><strong>Mais eficiência</strong> para cada deslocamento.</h2></div><p>A Arion nasceu para oferecer uma nova experiência em transporte urbano.<br/>Somos uma empresa de táxi executivo, combinando a praticidade e a agilidade de um táxi com um padrão de atendimento pensado para quem valoriza conforto, pontualidade e profissionalismo.<br/>Mais do que levar você até o destino, buscamos tornar cada deslocamento mais eficiente — desde a escolha da rota até o momento da chegada.</p></div></section>
 <section className="route-section"><div className="wrap route-card"><div><h2><strong>Mais opções</strong> para chegar ao seu destino.</h2><p>Em determinados trajetos, a Arion conta com acesso a faixas exclusivas destinadas ao transporte coletivo, criando uma alternativa para escapar de trechos de trânsito intenso e tornar o deslocamento mais ágil.</p><p>É uma vantagem que faz parte da nossa operação e que pode representar mais fluidez, mais previsibilidade e mais tempo para você.</p></div></div><img className="seal" src="/images/Logo-1.webp" alt="" width="92" height="92" loading="lazy"/></section>
 <section className="photo-strip" aria-label="Veículos Arion"><div className="photo-track" tabIndex={0} role="region" aria-label="Galeria de veículos: deslize para os lados para ver todas as fotos">{[1,2,3,4,5].map(i=><img key={i} src={i===3 ? '/images/corolla-trunk.webp' : '/images/gallery-'+i+'.webp'} width="350" height="532" alt={i===3 ? 'Corolla da Arion com o porta-malas aberto' : 'Veículo da Arion — foto '+i} loading="lazy"/>)}</div><img className="separator top" src="/images/Separator-top.webp" alt="" loading="lazy"/><img className="separator bottom" src="/images/Separator-bottom.webp" alt="" loading="lazy"/></section>
 <section id="servicos" className="services section"><div className="wrap"><div className="section-title"><h2>Soluções de mobilidade para <strong>diferentes momentos da sua rotina.</strong></h2><p>Da agenda corporativa aos deslocamentos pessoais, a Arion oferece transporte executivo sob medida para diferentes necessidades.</p></div><div className="service-grid">{services.map(([icon,title,description],i)=><article className={'service service-'+i} key={title}><Icon name={icon}/><h3>{title}</h3><p>{description}</p></article>)}<article className="service service-cta"><h3>Solicite seu serviço e conte com a Arion para cuidar do seu deslocamento.</h3><Contact>Solicitar serviço</Contact></article></div></div></section>
 <section className="fleet section" aria-roledescription="carrossel" aria-label="Nossa frota"><div className="wrap"><div className="section-title"><h2>Nossa <strong>frota</strong></h2><p>Veículos de alto padrão para diferentes necessidades, sempre com conforto, segurança e uma experiência executiva.</p></div><div className="fleet-stage"><Button className="fleet-control previous" aria-label="Veículo anterior" onClick={()=>setCar((car+3)%4)}><Icon name="fleet-arrow"/></Button><img className="fleet-car" src={car===1 ? '/images/corolla-cross-black.webp' : '/images/car-0'+(car+1)+'.webp'} alt={cars[car][0]} width="772" height="435" loading="lazy"/><Button className="fleet-control" aria-label="Próximo veículo" onClick={()=>setCar((car+1)%4)}><Icon name="fleet-arrow"/></Button></div><div className="fleet-caption" aria-live="polite" aria-atomic="true"><h3>{cars[car][0]}</h3><p>{cars[car][1]}</p></div></div></section>
 <section id="beneficios" className="comparison section"><div className="wrap"><div className="comparison-content"><h2>Mais do que conhecer o caminho. <strong>Saber como chegar melhor.</strong></h2><p>Tempo também é um recurso. Por isso, a Arion trabalha com planejamento de rotas para buscar alternativas mais eficientes para cada deslocamento.<br/>Em determinados trajetos, temos acesso a faixas exclusivas destinadas ao transporte coletivo, o que pode permitir maior fluidez e reduzir o impacto do trânsito no percurso.</p><div className="comparison-grid"><div><h3><Icon name="road-white"/>Rota convencional</h3><ul>{['Trânsito intenso','Menor fluidez','Maior tempo de deslocamento'].map(t=><li key={t}><Icon name="check"/>{t}</li>)}</ul></div><span className="versus" aria-label="comparado a">×</span><div><h3 className="arion-route"><Icon name="brand-dark"/>Com a Arion</h3><ul>{['Planejamento','Alternativas de rota','Maior agilidade'].map(t=><li key={t}><Icon name="check"/>{t}</li>)}</ul></div></div></div></div></section>
 <section id="empresas" className="business section"><div className="wrap business-grid"><div className="business-copy"><h2><strong>Mobilidade que acompanha</strong> o ritmo da sua empresa.</h2><p>Quando deslocamentos fazem parte da operação, contar com um serviço confiável deixa de ser apenas uma conveniência.<br/>A Arion oferece uma solução de transporte executivo para empresas que precisam proporcionar conforto, pontualidade e praticidade para seus executivos, colaboradores, clientes e parceiros.</p><Contact>Conhecer soluções corporativas</Contact></div><div className="benefit-list">{benefits.map(([icon,title,description])=><article key={title}><span className="benefit-icon"><Icon name={icon}/></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>
 <section className="mosaic-section" aria-label="A Arion em diferentes trajetos"><div className="wrap mosaic">{Array.from({length:8},(_,i)=><img key={i} src={'/images/mosaic-'+(i+1)+'.webp'} alt={'Frota Arion em atendimento — foto '+(i+1)} width="300" height="346" loading="lazy"/>)}</div></section>
 <section id="como-funciona" className="how section"><div className="wrap"><div className="section-title"><h2>Do primeiro contato<br/><strong>ao destino, sem complicação.</strong></h2><p>Para quem transforma deslocamentos em parte importante do dia, contar com um serviço confiável faz toda a diferença.</p></div><ol className="steps">{steps.map(([title,description],i)=><li key={title}><span className="step-number" aria-hidden="true">{i+1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div><img className="how-person" src="/images/container-11-background-left-image.webp" alt="" width="749" height="1062" loading="lazy"/></section>
 <footer id="contato" className="footer section"><div className="wrap"><img src="/images/Logo.webp" alt="Arion Transporte Executivo" width="196" height="64" loading="lazy"/><h2>Seu tempo merece uma <strong>mobilidade à altura.</strong></h2><p>Conte com a Arion para seus deslocamentos executivos, corporativos e aeroportuários.<br/>Solicite sua corrida e descubra uma forma mais confortável e eficiente de chegar ao seu destino.</p>{contactUrl?<Actions/>:<div className="contact-pending"><Button className="button" disabled>Solicitar serviço</Button><Button className="button secondary" disabled>Falar com a Arion <Icon name="arrow"/></Button><p>Canal de contato em breve.</p></div>}</div></footer>
 </main>;
}
