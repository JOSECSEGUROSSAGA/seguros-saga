import { useState } from 'react';

const WHATSAPP_NUMBER = '522222809070';
const EMAIL = 'arely.segurossaga@gmail.com';

const ahorroOptions = [
  'Menos de $12,000 anuales (menos de $1,000 mensuales)',
  '$12,000 a $24,000 anuales ($1,000 a $2,000 mensuales)',
  '$24,000 a $36,000 anuales ($2,000 a $3,000 mensuales)',
  '$36,000 a $60,000 anuales ($3,000 a $5,000 mensuales)',
  'Más de $60,000 anuales (más de $5,000 mensuales)',
];

export default function App() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    edad: '',
    genero: '',
    salud: '',
    ahorro: '',
    producto: '',
    comentarios: '',
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const buildPlainMessage = () => {
    return [
      'Hola, quiero recibir asesoría de Seguros Saga.',
      '',
      `Nombre: ${form.nombre || 'No capturado'}`,
      `Teléfono/WhatsApp: ${form.telefono || 'No capturado'}`,
      `Correo: ${form.correo || 'No capturado'}`,
      `Edad: ${form.edad || 'No capturada'}`,
      `Género: ${form.genero || 'No capturado'}`,
      `Estado de salud: ${form.salud || 'No capturado'}`,
      `Ahorro aproximado anual: ${form.ahorro || 'No capturado'}`,
      `Producto de interés: ${form.producto || 'No capturado'}`,
      `Comentarios: ${form.comentarios || 'Sin comentarios'}`,
    ].join('\n');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(buildPlainMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const openEmail = () => {
    const subject = encodeURIComponent('Solicitud de asesoría Seguros Saga');
    const body = encodeURIComponent(buildPlainMessage());
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="site">
      <Header scrollTo={scrollTo} openWhatsApp={openWhatsApp} />
      <Hero scrollTo={scrollTo} openWhatsApp={openWhatsApp} />
      <Solutions />
      <Advisory scrollTo={scrollTo} />
      <Access openWhatsApp={openWhatsApp} />
      <ContactForm
        form={form}
        updateField={updateField}
        openWhatsApp={openWhatsApp}
        openEmail={openEmail}
      />
      <Footer />
    </main>
  );
}

function Header({ scrollTo, openWhatsApp }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button type="button" onClick={() => scrollTo('inicio')} className="brand">
          <img src="/LOGO.jpg" alt="Logo Seguros Saga" className="brand-logo" />
          <span>
            <strong>SEGUROS SAGA</strong>
            <small>Asesoría patrimonial</small>
          </span>
        </button>

        <nav className="nav" aria-label="Navegación principal">
          <button type="button" onClick={() => scrollTo('inicio')}>Inicio</button>
          <button type="button" onClick={() => scrollTo('soluciones')}>Soluciones</button>
          <button type="button" onClick={() => scrollTo('asesoria')}>Asesoría</button>
          <button type="button" onClick={() => scrollTo('formulario')}>Formulario</button>
          <button type="button" onClick={() => scrollTo('ingresar')}>Ingresar</button>
        </nav>

        <button type="button" onClick={openWhatsApp} className="btn btn-gold compact">
          Contacto
        </button>
      </div>
    </header>
  );
}

function Hero({ scrollTo, openWhatsApp }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Ahorro, retiro, salud y protección con asesoría cercana</p>
          <h1>Protege lo que amas. Construye el futuro que imaginas.</h1>
          <p className="lead">
            En Seguros Saga acompañamos a las personas a tomar decisiones importantes con claridad,
            empatía y una estrategia pensada para su etapa de vida.
          </p>
          <div className="actions">
            <button type="button" onClick={openWhatsApp} className="btn btn-gold">
              Hablar por WhatsApp
            </button>
            <button type="button" onClick={() => scrollTo('formulario')} className="btn btn-outline">
              Solicitar asesoría
            </button>
          </div>
        </div>

        <div className="hero-card-wrap">
          <div className="glow" />
          <article className="hero-card">
            <img src="/LOGO.jpg" alt="Logo Seguros Saga" className="hero-logo" />
            <div className="mini-card">
              <span className="emoji">🤝</span>
              <h2>No vendemos por vender.</h2>
              <p>Te orientamos para que entiendas tus opciones y elijas con tranquilidad.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="soluciones" className="section container">
      <div className="section-heading">
        <p className="section-kicker">Soluciones</p>
        <h2>Productos importantes, explicados de forma sencilla.</h2>
        <p>
          Nuestro objetivo es ayudarte a elegir una solución que tenga sentido para tus metas,
          tu presupuesto y tu tranquilidad.
        </p>
      </div>

      <div className="cards-grid">
        <SolutionCard emoji="💰" title="Ahorro y PPR" text="Planes para construir retiro, patrimonio y metas de largo plazo con disciplina." />
        <SolutionCard emoji="⏳" title="Pagos limitados" text="Alternativas con periodos definidos de pago y beneficios pensados a futuro." />
        <SolutionCard emoji="🏥" title="Gastos Médicos Mayores" text="Protección ante eventos de salud que pueden representar costos elevados." />
        <SolutionCard emoji="🚗" title="Seguro de Auto" text="Coberturas para cuidar tu movilidad, patrimonio y tranquilidad al conducir." />
      </div>
    </section>
  );
}

function SolutionCard({ emoji, title, text }) {
  return (
    <article className="solution-card">
      <span className="card-emoji">{emoji}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Advisory({ scrollTo }) {
  return (
    <section id="asesoria" className="advisory">
      <div className="container advisory-grid">
        <div>
          <p className="section-kicker">Nuestro enfoque</p>
          <h2>Primero escuchamos. Después recomendamos.</h2>
          <p>
            Sabemos que hablar de retiro, salud, ahorro o seguros puede sentirse complejo.
            Por eso trabajamos con un proceso humano, claro y sin presión.
          </p>
          <button type="button" onClick={() => scrollTo('formulario')} className="btn btn-gold">
            Iniciar diagnóstico
          </button>
        </div>

        <div className="steps">
          <ProcessStep emoji="👥" title="1. Conocemos tus objetivos" text="Identificamos qué quieres proteger, cuánto deseas ahorrar y qué etapa de vida estás planeando." />
          <ProcessStep emoji="🛡️" title="2. Diseñamos una estrategia" text="Te presentamos opciones claras, comparables y alineadas a tu presupuesto." />
          <ProcessStep emoji="📅" title="3. Te acompañamos" text="Damos seguimiento para resolver dudas, revisar cambios y mantener tu estrategia actualizada." />
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ emoji, title, text }) {
  return (
    <article className="process-step">
      <span>{emoji}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Access({ openWhatsApp }) {
  return (
    <section id="ingresar" className="section container">
      <div className="access-box">
        <div>
          <p className="section-kicker">Acceso</p>
          <h2>Listo para entrar en contacto con Seguros Saga</h2>
          <p>
            Por ahora este acceso abre WhatsApp directo. Cuando tengan portal, CRM o sistema interno,
            este botón puede conectarse a ese enlace.
          </p>
        </div>
        <button type="button" onClick={openWhatsApp} className="btn btn-outline">
          Ingresar
        </button>
      </div>
    </section>
  );
}

function ContactForm({ form, updateField, openWhatsApp, openEmail }) {
  return (
    <section id="formulario" className="contact-section">
      <div className="container contact-grid">
        <div>
          <p className="section-kicker dark">Contacto</p>
          <h2>Cuéntanos qué quieres construir.</h2>
          <p className="contact-lead">
            Con esta información podremos darte una orientación inicial más útil y cercana.
          </p>

          <div className="contact-card">
            <button type="button" onClick={openWhatsApp}>💬 WhatsApp: 222 280 9070</button>
            <a href="tel:+522222809070">📞 Teléfono: 222 280 9070</a>
            <button type="button" onClick={openEmail}>✉️ arely.segurossaga@gmail.com</button>
          </div>
        </div>

        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <h3>Formulario de asesoría</h3>
          <p>Completa los datos y presiona WhatsApp o correo para enviar la solicitud.</p>

          <div className="form-grid">
            <Input label="Nombre completo" value={form.nombre} onChange={(v) => updateField('nombre', v)} placeholder="Escribe tu nombre" />
            <Input label="Teléfono / WhatsApp" value={form.telefono} onChange={(v) => updateField('telefono', v)} placeholder="Ej. 222 280 9070" />
            <Input label="Correo electrónico" value={form.correo} onChange={(v) => updateField('correo', v)} placeholder="tu.correo@email.com" type="email" />
            <Input label="Edad" value={form.edad} onChange={(v) => updateField('edad', v)} placeholder="Ej. 35" type="number" />

            <Select label="Género" value={form.genero} onChange={(v) => updateField('genero', v)}>
              <option value="">Selecciona una opción</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Prefiero no decirlo</option>
            </Select>

            <Select label="Estado de salud" value={form.salud} onChange={(v) => updateField('salud', v)}>
              <option value="">Selecciona una opción</option>
              <option>Excelente</option>
              <option>Bueno</option>
              <option>Regular</option>
              <option>Requiero comentarlo con un asesor</option>
            </Select>
          </div>

          <Select label="¿Cuánto estarías dispuesto(a) a ahorrar aproximadamente de manera anual?" value={form.ahorro} onChange={(v) => updateField('ahorro', v)}>
            <option value="">Selecciona un rango</option>
            {ahorroOptions.map((option) => <option key={option}>{option}</option>)}
          </Select>

          <Select label="Producto de interés" value={form.producto} onChange={(v) => updateField('producto', v)}>
            <option value="">Selecciona una opción</option>
            <option>Ahorro / PPR</option>
            <option>Pagos limitados</option>
            <option>Gastos Médicos Mayores</option>
            <option>Seguro de Auto</option>
            <option>Asesoría general</option>
          </Select>

          <label className="field">
            <span>Comentarios adicionales</span>
            <textarea
              value={form.comentarios}
              onChange={(event) => updateField('comentarios', event.target.value)}
              placeholder="Cuéntanos brevemente qué necesitas"
            />
          </label>

          <div className="form-actions">
            <button type="button" onClick={openWhatsApp} className="btn btn-gold">Enviar por WhatsApp</button>
            <button type="button" onClick={openEmail} className="btn btn-dark">Enviar por correo</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
    </label>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/LOGO.jpg" alt="Logo Seguros Saga" />
          <div>
            <strong>SEGUROS SAGA</strong>
            <p>Asesoría patrimonial, protección y ahorro.</p>
          </div>
        </div>
        <p>© 2026 Seguros Saga. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
