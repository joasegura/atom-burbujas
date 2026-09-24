import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  // El layout raíz ya agrega " | Atom Soluciones IT" vía template.
  title: "Privacidad de Corralón App",
  description:
    "Política de Privacidad de Corralón App: qué datos recopila la aplicación, con qué finalidad se usan, cómo se protegen y cómo solicitar su baja.",
  alternates: { canonical: "https://atomsolucionesit.com.ar/privacidad/corralon" },
  openGraph: {
    title: "Privacidad de Corralón App | Atom Soluciones IT",
    description: "Política de Privacidad de Corralón App: datos que se recopilan, finalidad, seguridad y contacto.",
    url: "https://atomsolucionesit.com.ar/privacidad/corralon",
    locale: "es_AR",
    type: "website",
  },
}

export default function PrivacidadCorralonPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/privacidad"
        className="text-[15px] text-secondary-foreground/50 underline-offset-4 transition-colors hover:text-primary hover:underline"
      >
        &larr; Todas las políticas
      </Link>

      <h1 className="mt-8 text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
        Política de Privacidad — <span className="text-primary">Corralón App</span>
      </h1>
      <p className="mt-6 text-[15px] text-secondary-foreground/50">Última actualización: 23 de septiembre de 2026</p>

      <div className="mt-10 space-y-5 border-t border-border/15 pt-10">
        <p className="text-lg leading-relaxed text-secondary-foreground/70 text-pretty">
          La aplicación Corralón App (en adelante, «la Aplicación») es una herramienta tecnológica destinada a la
          gestión operativa, registro y seguimiento de tareas y servicios asignados a cuadrillas, choferes y
          personal de servicios públicos.
        </p>
        <p className="text-lg leading-relaxed text-secondary-foreground/70 text-pretty">
          Esta Política de Privacidad describe cómo se recopila, utiliza, almacena y protege la información del
          personal autorizado que utiliza la Aplicación.
        </p>
      </div>

      <Seccion numero="1" titulo="Información que recopilamos">
        <p>
          Para garantizar el funcionamiento operativo de las tareas de campo, la Aplicación puede solicitar y
          recopilar los siguientes datos:
        </p>
        <Dato titulo="Datos de autenticación e identificación">
          DNI (Documento Nacional de Identidad) y credenciales de acceso para verificar la identidad del personal
          en el sistema municipal.
        </Dato>
        <Dato titulo="Ubicación en primer plano">
          Para mostrar al usuario su posición actual en relación con los destinos y puntos de las tareas a
          realizar.
        </Dato>
        <Dato titulo="Ubicación en segundo plano">
          Durante la ejecución de una tarea activa asignada, la Aplicación puede registrar el trayecto y recorrido
          del vehículo o cuadrilla para garantizar la trazabilidad del servicio, incluso cuando la pantalla esté
          bloqueada o la app minimizada. El seguimiento se detiene automáticamente al finalizar o pausar la tarea.
        </Dato>
        <Dato titulo="Cámara y fotos / galería">
          Acceso a la cámara y galería multimedia únicamente con el objetivo de capturar y adjuntar imágenes
          fotográficas como constancia y evidencia del trabajo realizado en cada tarea o reclamo.
        </Dato>
      </Seccion>

      <Seccion numero="2" titulo="Finalidad del tratamiento de datos">
        <p>Los datos recopilados tienen exclusivamente fines laborales y operativos:</p>
        <Lista
          items={[
            "Autenticar al operario y cargar su listado de tareas asignadas.",
            "Registrar el inicio, avance, recorrido y finalización de los trabajos en la vía pública.",
            "Aportar comprobantes fotográficos del estado de las tareas para el control de gestión operativo.",
          ]}
        />
        <p>
          <strong className="font-medium text-secondary-foreground">No comercialización:</strong> la Aplicación NO
          vende, alquila, comercializa ni cede información de los usuarios a terceros con fines publicitarios o
          comerciales.
        </p>
      </Seccion>

      <Seccion numero="3" titulo="Seguridad de los datos">
        <p>
          Toda la comunicación entre la Aplicación y los servidores se efectúa mediante protocolos seguros y
          cifrados en tránsito (HTTPS y WSS / SSL). El acceso a la información está restringido únicamente a
          administradores autorizados del sistema de gestión operativa.
        </p>
      </Seccion>

      <Seccion numero="4" titulo="Retención y eliminación de datos">
        <p>
          Los datos de recorridos y tareas se conservan en los servidores con fines de auditoría y gestión de
          servicios. Si un usuario o empleado desea solicitar la actualización, baja o eliminación de sus datos
          personales, puede gestionarlo a través del área de administración responsable o escribiendo al correo de
          contacto.
        </p>
      </Seccion>

      <Seccion numero="5" titulo="Contacto">
        <p>
          Para cualquier duda o consulta respecto a esta Política de Privacidad, los interesados pueden ponerse en
          contacto a través de:
        </p>
        <ul className="border-t border-border/15">
          <li className="border-b border-border/15 py-3.5 leading-relaxed">
            Correo de soporte:{" "}
            <a
              href="mailto:contacto@atomsolucionesit.com.ar"
              className="text-primary underline-offset-4 hover:underline"
            >
              contacto@atomsolucionesit.com.ar
            </a>{" "}
            /{" "}
            <a href="mailto:niveyrojulian5@gmail.com" className="text-primary underline-offset-4 hover:underline">
              niveyrojulian5@gmail.com
            </a>
          </li>
          <li className="border-b border-border/15 py-3.5 leading-relaxed">
            Desarrollador / Proveedor: Atom Soluciones IT / Corralón
          </li>
        </ul>
      </Seccion>
    </div>
  )
}

// Cada apartado repite la misma estructura: número, título y cuerpo con el mismo ritmo tipográfico.
function Seccion({ numero, titulo, children }: { numero: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 border-t border-border/15 pt-10">
      <h2 className="text-2xl font-medium leading-snug tracking-tight">
        <span className="mr-3 text-secondary-foreground/30">{numero}</span>
        {titulo}
      </h2>
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-secondary-foreground/70">{children}</div>
    </section>
  )
}

// Los permisos sensibles (ubicación, cámara) se destacan del cuerpo: son lo que la tienda de apps audita.
function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border/15 pt-4">
      <p className="font-medium text-secondary-foreground">{titulo}</p>
      <p className="mt-1.5 text-pretty">{children}</p>
    </div>
  )
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-border/15">
      {items.map((item) => (
        <li key={item} className="border-b border-border/15 py-3.5 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  )
}
