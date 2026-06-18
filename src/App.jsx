import { useEffect, useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '522222809070';
const PRIMARY_PHONE_DISPLAY = '222 280 9070';
const SECONDARY_PHONE_DISPLAY = '221 345 6083';
const EMAIL = 'arelyg.segurossaga@gmail.com';
const SECONDARY_EMAIL = 'josec.segurossaga@gmail.com';

const ahorroOptions = [
  'Menos de $12,000 anuales (menos de $1,000 mensuales)',
  '$12,000 a $24,000 anuales ($1,000 a $2,000 mensuales)',
  '$24,000 a $36,000 anuales ($2,000 a $3,000 mensuales)',
  '$36,000 a $60,000 anuales ($3,000 a $5,000 mensuales)',
  'Más de $60,000 anuales (más de $5,000 mensuales)',
];
const routes = ['/', '/autos', '/salud', '/vida-ahorro', '/empresarial'];

export default function App() {
  const [path, setPath] = useState(getCleanPath());
  useEffect(() => {
    const onPop = () => setPath(getCleanPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (nextPath) => {
    const safePath = routes.includes(nextPath) ? nextPath : '/';
    window.history.pushState({}, '', safePath);
    setPath(safePath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openWhatsApp = (message = 'Hola, quiero recibir asesoría de Seguros Saga.') => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const openEmail = () => {
    window.location.href = `mailto:${EMAIL}?cc=${SECONDARY_EMAIL}&subject=${encodeURIComponent('Solicitud de asesoría Seguros Saga')}`;
  };
  return (
    <main className="site">
      <Header navigate={navigate} openWhatsApp={openWhatsApp} currentPath={path} />
      <FloatingWhatsApp openWhatsApp={openWhatsApp} />
      {path === '/' && <Home navigate={navigate} openWhatsApp={openWhatsApp} />}
      {path === '/autos' && <AutosPage navigate={navigate} openWhatsApp={openWhatsApp} />}
      {path === '/salud' && <SaludPage navigate={navigate} openWhatsApp={openWhatsApp} />}
      {path === '/vida-ahorro' && <VidaAhorroPage navigate={navigate} openWhatsApp={openWhatsApp} />}
      {path === '/empresarial' && <EmpresarialPage navigate={navigate} openWhatsApp={openWhatsApp} />}
      <Footer navigate={navigate} openEmail={openEmail} openWhatsApp={openWhatsApp} />
    </main>
  );
}
function getCleanPath() { return routes.includes(window.location.pathname) ? window.location.pathname : '/'; }

function Header({ navigate, openWhatsApp, currentPath }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button type="button" className="brand" onClick={() => navigate('/')}>
          <img src="/LOGO.jpg" alt="Logo Seguros Saga" className="brand-logo" />
          <span><strong>SEGUROS SAGA</strong><small>Asesoría patrimonial</small></span>
        </button>
        <nav className="nav" aria-label="Navegación principal">
          <button className={currentPath === '/' ? 'active' : ''} onClick={() => navigate('/')}>Inicio</button>
          <button className={currentPath === '/vida-ahorro' ? 'active' : ''} onClick={() => navigate('/vida-ahorro')}>Vida y ahorro</button>
          <button className={currentPath === '/salud' ? 'active' : ''} onClick={() => navigate('/salud')}>Salud</button>
          <button className={currentPath === '/autos' ? 'active' : ''} onClick={() => navigate('/autos')}>Autos</button>
          <button className={currentPath === '/empresarial' ? 'active' : ''} onClick={() => navigate('/empresarial')}>Empresarial</button>
        </nav>
        <button type="button" className="btn btn-primary compact" onClick={() => openWhatsApp()}>Contacto</button>
      </div>
    </header>
  );
}

function FloatingWhatsApp({ openWhatsApp }) {
  return <button type="button" className="floating-whatsapp" onClick={() => openWhatsApp()} aria-label="Contactar por WhatsApp"><span>💬</span><strong>WhatsApp</strong></button>;
}

function Home({ navigate, openWhatsApp }) {
  return (
    <>
      <section className="hero calm-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Seguros, ahorro y protección con asesoría cercana</p>
            <h1>Decisiones importantes, explicadas con claridad y confianza.</h1>
            <p className="lead">En Seguros Saga te acompañamos para cuidar tu patrimonio, tu salud, tu familia y tus proyectos con soluciones pensadas para cada etapa de tu vida.</p>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={() => openWhatsApp()}>Hablar con un asesor</button>
              <button type="button" className="btn btn-soft" onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}>Ver soluciones</button>
            </div>
          </div>
          <article className="hero-card calm-card">
            <img src="/LOGO.jpg" alt="Logo Seguros Saga" className="hero-logo" />
            <div className="mini-card light"><span className="emoji">🤝</span><p>Te orientamos para que conozcas tus opciones y elijas con tranquilidad.</p></div>
          </article>
        </div>
      </section>
      <section id="productos" className="section container centered-section">
        <p className="section-kicker">Soluciones</p>
        <h2>Productos importantes, explicados de forma sencilla.</h2>
        <p className="section-intro">Selecciona una opción para conocer cómo podemos ayudarte y solicitar una cotización.</p>
        <div className="product-grid">
          <ProductCard icon="🛡️" title="Vida y ahorro" text="Planes de vida, retiro, futuro de tus hijos y planeación patrimonial." onClick={() => navigate('/vida-ahorro')} />
          <ProductCard icon="🏥" title="Salud" text="Gastos Médicos Mayores para cuidar lo más importante." onClick={() => navigate('/salud')} />
          <ProductCard icon="🚗" title="Autos" text="Protección para tu vehículo, tu camino y tu patrimonio." onClick={() => navigate('/autos')} />
          <ProductCard icon="🏢" title="Empresarial" text="Estrategias para proteger empresas, colaboradores y operación." onClick={() => navigate('/empresarial')} />
        </div>
      </section>
      <section className="advisory-soft">
        <div className="container advisory-grid">
          <div><p className="section-kicker">Nuestro enfoque</p><h2>Primero entendemos tus objetivos. Después diseñamos una estrategia.</h2><p>Nuestro trabajo es escuchar, explicar y acompañarte para que puedas tomar una decisión informada, sin presión y con una visión clara de protección.</p></div>
          <div className="steps"><ProcessStep icon="👥" title="1. Diagnóstico" text="Conocemos tu situación, tus metas y tus prioridades." /><ProcessStep icon="📋" title="2. Opciones claras" text="Te presentamos alternativas comprensibles y alineadas a tus necesidades." /><ProcessStep icon="🤝" title="3. Acompañamiento" text="Te damos seguimiento antes, durante y después de contratar." /></div>
        </div>
      </section>
      <section className="section container"><ContactDetails openWhatsApp={openWhatsApp} /></section>
    </>
  );
}

function ProductCard({ icon, title, text, onClick }) { return <button type="button" className="product-card" onClick={onClick}><span>{icon}</span><h3>{title}</h3><p>{text}</p><strong>Conocer más →</strong></button>; }
function ProcessStep({ icon, title, text }) { return <article className="process-step light-step"><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>; }
function ContactDetails({ openWhatsApp }) { return <div className="contact-strip"><div><strong>Contacto Seguros Saga</strong><p>WhatsApp principal: {PRIMARY_PHONE_DISPLAY} · Contacto adicional: {SECONDARY_PHONE_DISPLAY}</p><p>Correos: {EMAIL} · {SECONDARY_EMAIL}</p></div><button type="button" className="btn btn-primary" onClick={() => openWhatsApp()}>Escribir por WhatsApp</button></div>; }

function AutosPage({ navigate, openWhatsApp }) {
  const [form, setForm] = useState({ marcaModelo: '', edadConductor: '', codigoPostal: '', tipo: 'Particular' });
  const message = useMemo(() => ['Hola, quiero cotizar un Seguro de Auto con Seguros Saga.', '', `Tipo: ${form.tipo || 'No capturado'}`, `Marca y modelo del vehículo: ${form.marcaModelo || 'No capturado'}`, `Edad del conductor: ${form.edadConductor || 'No capturada'}`, `Código postal: ${form.codigoPostal || 'No capturado'}`].join('\n'), [form]);
  return <PageShell navigate={navigate} kicker="Seguro de auto" title="Tu destino es llegar seguro. Nuestra misión es respaldarte en el camino." imageClass="auto-photo"><p className="page-lead">Cada trayecto cuenta: llevar a tus hijos a la escuela, llegar a tu trabajo o disfrutar un viaje con tu familia. Por eso te ayudamos a proteger tu vehículo y tu patrimonio con soluciones diseñadas para darte tranquilidad cuando más lo necesitas.</p><div className="image-choice-grid"><IllustrationCard icon="🚘" title="Particular" text="Protección para el vehículo que usas todos los días." active={form.tipo === 'Particular'} onClick={() => setForm({ ...form, tipo: 'Particular' })} /><IllustrationCard icon="🚚" title="Flotilla" text="Soluciones para varios vehículos y operación empresarial." active={form.tipo === 'Flotilla'} onClick={() => setForm({ ...form, tipo: 'Flotilla' })} /></div><ContactDetails openWhatsApp={openWhatsApp} /><QuoteForm title="Obtén tu cotización" onSubmit={() => openWhatsApp(message)}><Input label="Marca y modelo del vehículo" value={form.marcaModelo} onChange={(v) => setForm({ ...form, marcaModelo: v })} placeholder="Ej. Nissan Versa 2022" /><Input label="¿Cuántos años tiene el conductor?" value={form.edadConductor} onChange={(v) => setForm({ ...form, edadConductor: v })} placeholder="Ej. 35" type="number" /><Input label="Código postal" value={form.codigoPostal} onChange={(v) => setForm({ ...form, codigoPostal: v })} placeholder="Ej. 72000" /></QuoteForm></PageShell>;
}

function SaludPage({ navigate, openWhatsApp }) {
  const [form, setForm] = useState({ integrantes: '', edades: '', salud: '' });
  const message = useMemo(() => ['Hola, quiero cotizar un Seguro de Gastos Médicos Mayores con Seguros Saga.', '', `Integrantes a asegurar: ${form.integrantes || 'No capturado'}`, `Edad(es): ${form.edades || 'No capturada(s)'}`, `Estado de salud: ${form.salud || 'No capturado'}`].join('\n'), [form]);
  return <PageShell navigate={navigate} kicker="Salud" title="Seguros de Gastos Médicos Mayores" imageClass="health-photo"><p className="page-lead">La mejor inversión siempre será tu salud y la de quienes más amas. Una enfermedad o accidente puede cambiarlo todo en un instante. Con un Seguro de Gastos Médicos Mayores cuentas con el respaldo necesario para acceder a atención médica de calidad mientras proteges tu patrimonio.</p><FeatureBand icon="🏥" title="Si quieres cotizar, contáctanos" text="Comparte algunos datos básicos y un asesor se pondrá en contacto contigo por WhatsApp." /><ContactDetails openWhatsApp={openWhatsApp} /><QuoteForm title="Cotiza tu protección médica" onSubmit={() => openWhatsApp(message)}><Input label="¿Cuántos integrantes desean asegurar?" value={form.integrantes} onChange={(v) => setForm({ ...form, integrantes: v })} placeholder="Ej. 1, 2, 4" type="number" /><Input label="Edad o edades" value={form.edades} onChange={(v) => setForm({ ...form, edades: v })} placeholder="Ej. 35, 33, 8" /><Select label="¿Cómo consideran su estado de salud?" value={form.salud} onChange={(v) => setForm({ ...form, salud: v })}><option value="">Selecciona una opción</option><option>Excelente</option><option>Bueno</option><option>Regular</option><option>Malo</option></Select></QuoteForm></PageShell>;
}

function VidaAhorroPage({ navigate, openWhatsApp }) {
  const [form, setForm] = useState({ nombre: '', productos: '', ahorro: '' });
  const message = useMemo(() => ['Hola, quiero asesoría sobre Vida y Ahorro con Seguros Saga.', '', `Nombre: ${form.nombre || 'No capturado'}`, `Producto(s) de interés: ${form.productos || 'No capturado'}`, `Ahorro aproximado anual: ${form.ahorro || 'No capturado'}`].join('\n'), [form]);
  return <PageShell navigate={navigate} kicker="Vida y ahorro" title="Protección, ahorro y planeación para el futuro" imageClass="life-photo"><div className="topic-grid"><TopicCard icon="🛡️" title="Seguros de vida" text="El amor también se demuestra protegiendo el futuro de quienes más amas. Un Seguro de Vida te permite brindar tranquilidad y estabilidad económica a tu familia ante los imprevistos de la vida. Porque proteger a quienes dependen de ti es una de las decisiones más importantes que puedes tomar hoy." /><TopicCard icon="🎓" title="Plan para el futuro de tus hijos" text="Hoy los tomas de la mano. Mañana los ayudarás a alcanzar sus sueños. Cada padre desea darles a sus hijos las mejores oportunidades. Construye un respaldo financiero que les permita continuar su formación profesional y perseguir sus metas con mayor tranquilidad." /><TopicCard icon="🌱" title="Retiro inteligente PPR" text="Haz que tus impuestos trabajen a favor de tu futuro. A través de un Plan Personal de Retiro, puedes aprovechar beneficios fiscales que te permiten optimizar tu carga tributaria mientras construyes un respaldo financiero para la etapa en la que más lo necesitarás." /><TopicCard icon="🏡" title="Planeación patrimonial" text="Trabaja unos años por tu patrimonio, disfruta sus beneficios toda la vida. A través de aportaciones programadas durante un plazo determinado, puedes construir una estrategia financiera que combine protección, ahorro y la tranquilidad de contar con un respaldo para el futuro." /></div><ContactDetails openWhatsApp={openWhatsApp} /><QuoteForm title="Solicita asesoría" onSubmit={() => openWhatsApp(message)}><Input label="Nombre" value={form.nombre} onChange={(v) => setForm({ ...form, nombre: v })} placeholder="Escribe tu nombre" /><Select label="Producto o productos de interés" value={form.productos} onChange={(v) => setForm({ ...form, productos: v })}><option value="">Selecciona una opción</option><option>Seguro de Vida</option><option>Plan para el futuro de tus hijos</option><option>Retiro inteligente PPR</option><option>Planeación patrimonial</option><option>Varios productos</option></Select><Select label="¿Cuánto quisieras ahorrar aproximadamente de manera anual?" value={form.ahorro} onChange={(v) => setForm({ ...form, ahorro: v })}><option value="">Selecciona un rango</option>{ahorroOptions.map((option) => <option key={option}>{option}</option>)}</Select></QuoteForm></PageShell>;
}

function EmpresarialPage({ navigate, openWhatsApp }) {
  const [form, setForm] = useState({ nombre: '', contacto: '' });
  const message = useMemo(() => ['Hola, quiero asesoría sobre Protección Empresarial con Seguros Saga.', '', `Nombre: ${form.nombre || 'No capturado'}`, `Número de contacto: ${form.contacto || 'No capturado'}`].join('\n'), [form]);
  return <PageShell navigate={navigate} kicker="Empresarial" title="Protección empresarial" imageClass="business-photo"><p className="page-lead">Las grandes empresas no solo crecen, también se preparan para los imprevistos. Ayudamos a proteger lo que has construido mediante estrategias diseñadas para cuidar a tu empresa, tus colaboradores, tus clientes y la estabilidad financiera de tu organización.</p><div className="business-grid"><TopicCard icon="🏭" title="Seguro de daños" text="Protección para activos, instalaciones, operación y patrimonio empresarial." /><TopicCard icon="🏫" title="Seguro de accidentes escolares" text="Respaldo para instituciones educativas, alumnos y actividades escolares." /><TopicCard icon="⚖️" title="Seguro de responsabilidad civil" text="Cobertura ante posibles daños a terceros derivados de la operación." /><TopicCard icon="➕" title="Y mucho más..." text="Diseñamos soluciones de acuerdo con el giro, tamaño y necesidades de tu empresa." /></div><ContactDetails openWhatsApp={openWhatsApp} /><QuoteForm title="Contacto empresarial" onSubmit={() => openWhatsApp(message)}><Input label="Nombre" value={form.nombre} onChange={(v) => setForm({ ...form, nombre: v })} placeholder="Nombre completo" /><Input label="Número de contacto" value={form.contacto} onChange={(v) => setForm({ ...form, contacto: v })} placeholder="Ej. 222 280 9070" /></QuoteForm></PageShell>;
}

function PageShell({ navigate, kicker, title, imageClass, children }) { return <><section className="page-hero"><div className="container page-hero-inner page-hero-grid"><div><button type="button" className="back-link" onClick={() => navigate('/')}>← Volver a inicio</button><p className="eyebrow blue">{kicker}</p><h1>{title}</h1></div><div className={`page-photo ${imageClass || ''}`} aria-hidden="true" /></div></section><section className="container page-content">{children}</section></>; }
function IllustrationCard({ icon, title, text, active, onClick }) { return <button type="button" className={`illustration-card ${active ? 'selected' : ''}`} onClick={onClick}><span>{icon}</span><h3>{title}</h3><p>{text}</p></button>; }
function FeatureBand({ icon, title, text }) { return <article className="feature-band"><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>; }
function TopicCard({ icon, title, text }) { return <article className="topic-card"><div className="topic-image"><span>{icon}</span></div><div className="topic-body"><h3>{title}</h3><p>{text}</p></div></article>; }
function QuoteForm({ title, children, onSubmit }) { return <form className="quote-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}><h2>{title}</h2><p>Completa los datos y te contactaremos por WhatsApp para orientarte.</p><div className="quote-fields">{children}</div><button type="submit" className="btn btn-primary full">Enviar por WhatsApp</button></form>; }
function Input({ label, value, onChange, placeholder, type = 'text' }) { return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></label>; }
function Select({ label, value, onChange, children }) { return <label className="field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{children}</select></label>; }

function Footer({ navigate, openEmail, openWhatsApp }) {
  return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><img src="/LOGO.jpg" alt="Logo Seguros Saga" /><div><strong>SEGUROS SAGA</strong><p>Asesoría patrimonial, protección y ahorro.</p></div></div><div className="footer-links"><button onClick={() => navigate('/vida-ahorro')}>Vida y ahorro</button><button onClick={() => navigate('/salud')}>Salud</button><button onClick={() => navigate('/autos')}>Autos</button><button onClick={() => navigate('/empresarial')}>Empresarial</button></div><div className="footer-contact"><button onClick={() => openWhatsApp()}>WhatsApp principal: {PRIMARY_PHONE_DISPLAY}</button><span>Contacto adicional: {SECONDARY_PHONE_DISPLAY}</span><button onClick={openEmail}>{EMAIL}</button><span>{SECONDARY_EMAIL}</span></div></div><p className="copyright">© 2026 Seguros Saga. Todos los derechos reservados.</p></footer>;
}
