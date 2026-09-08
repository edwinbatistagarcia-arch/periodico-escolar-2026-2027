// Calendario Escolar 2026-2027 (MINERD) — eventos curados para el periódico escolar
const SCHOOL_EVENTS = [
  // Agosto 2026
  { date: "2026-08-03", title: "Inicio del año escolar 2026-2027 para docentes" },
  { date: "2026-08-15", title: "Día del Regocijo Popular" },
  { date: "2026-08-16", title: "1630 Aniversario de la Restauración de la República Dominicana" },
  { date: "2026-08-24", title: "Inicio del año escolar 2026-2027 para estudiantes" },
  // Septiembre 2026
  { date: "2026-09-08", title: "Día Internacional de la Alfabetización" },
  { date: "2026-09-24", title: "Día de Nuestra Señora de las Mercedes" },
  { date: "2026-09-26", title: "Inicio de la Feria Internacional del Libro Santo Domingo 2026" },
  { date: "2026-09-30", title: "Elecciones de los Consejos Estudiantiles (Nivel Secundario)" },
  // Octubre 2026
  { date: "2026-10-05", title: "Día Mundial de los Docentes" },
  { date: "2026-10-12", title: "Día del Descubrimiento de América y Encuentro entre Culturas" },
  { date: "2026-10-24", title: "Día de las Naciones Unidas · Día Internacional de las Bibliotecas Escolares" },
  { date: "2026-10-28", title: "Día de la Evaluación" },
  { date: "2026-10-30", title: "Entrega del primer reporte de calificaciones — Nivel Secundario (P1)" },
  { date: "2026-10-31", title: "Primera entrega del informe de aprendizaje — Nivel Primario (P1)" },
  // Noviembre 2026
  { date: "2026-11-07", title: "Día Nacional del Deporte" },
  { date: "2026-11-09", title: "Feriado: Día de la Constitución (movido al lunes)" },
  { date: "2026-11-18", title: "Día Nacional de la Familia" },
  { date: "2026-11-20", title: "Día Universal del Niño" },
  { date: "2026-11-25", title: "Día Internacional de la Eliminación de la Violencia contra la Mujer" },
  { date: "2026-11-30", title: "Entrega del primer reporte de calificaciones — Nivel Inicial (P1)" },
  // Diciembre 2026
  { date: "2026-12-07", title: "Día Nacional de los Directores y Directoras de Centros Educativos" },
  { date: "2026-12-18", title: "Inicio de vacaciones navideñas (hasta el 6 de enero)" },
  { date: "2026-12-25", title: "Día de Navidad" },
  // Enero 2027
  { date: "2027-01-01", title: "Año Nuevo" },
  { date: "2027-01-04", title: "Feriado: Día de Reyes (movido al lunes)" },
  { date: "2027-01-07", title: "Reinicio de clases tras las vacaciones navideñas" },
  { date: "2027-01-11", title: "Día Nacional de la Educación · Natalicio de Eugenio María de Hostos" },
  { date: "2027-01-13", title: "Día Nacional de la Alfabetización" },
  { date: "2027-01-25", title: "Feriado: Natalicio de Juan Pablo Duarte (movido al lunes)" },
  { date: "2027-01-29", title: "Entrega del segundo reporte de calificaciones — Nivel Secundario (P2)" },
  // Febrero 2027
  { date: "2027-02-18", title: "Día del y la Estudiante" },
  { date: "2027-02-21", title: "Día Internacional de la Lengua Materna" },
  { date: "2027-02-27", title: "Día de la Independencia Nacional · Día de la Bandera" },
  // Marzo 2027
  { date: "2027-03-08", title: "Día Internacional de la Mujer" },
  { date: "2027-03-19", title: "Batalla del 19 de Marzo (Azua, 1844)" },
  { date: "2027-03-26", title: "Viernes Santo" },
  // Abril 2027
  { date: "2027-04-02", title: "Día Mundial de Concienciación sobre el Autismo" },
  { date: "2027-04-07", title: "Día Mundial de la Salud" },
  { date: "2027-04-23", title: "Día Mundial del Libro y del Derecho de Autor" },
  // Mayo 2027
  { date: "2027-05-01", title: "Día Internacional del Trabajo" },
  { date: "2027-05-02", title: "Día Internacional contra el Acoso Escolar" },
  { date: "2027-05-30", title: "Día de las Madres" },
  // Junio 2027
  { date: "2027-06-01", title: "Entrega del cuarto reporte de calificaciones — Nivel Secundario (P4)" },
  { date: "2027-06-08", title: "Entrega de calificaciones finales — Nivel Secundario" },
  { date: "2027-06-18", title: "Cierre del año escolar 2026-2027 para estudiantes" },
  { date: "2027-06-25", title: "Entrega del boletín de calificaciones — Nivel Primario" },
  { date: "2027-06-30", title: "Día del Maestro y la Maestra" },
  // Julio-agosto 2027
  { date: "2027-07-15", title: "Día del Regocijo Popular" },
  { date: "2027-07-16", title: "Día de la Restauración de la República" },
];

(function () {
  const MONTH_NAMES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  function toDateKey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function formatLabel(dateKey) {
    const [y, m, d] = dateKey.split("-").map(Number);
    const eventDate = new Date(y, m - 1, d);
    return eventDate.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
  }

  function renderNextEvent(today) {
    const todayKey = toDateKey(today);

    const todayEvents = SCHOOL_EVENTS.filter(e => e.date === todayKey);
    const upcoming = SCHOOL_EVENTS
      .filter(e => e.date > todayKey)
      .sort((a, b) => a.date.localeCompare(b.date))[0];

    const todayBox = document.getElementById("today-event");
    const todayDateEl = document.getElementById("today-event-date");
    const todayNameEl = document.getElementById("today-event-name");
    const nextDateEl = document.getElementById("next-event-date");
    const nextNameEl = document.getElementById("next-event-name");
    if (!nextDateEl || !nextNameEl) return;

    if (todayEvents.length > 0 && todayBox && todayDateEl && todayNameEl) {
      todayBox.hidden = false;
      todayDateEl.textContent = `Hoy, ${formatLabel(todayKey)}`;
      todayNameEl.textContent = todayEvents.map(e => e.title).join(" · ");
    } else if (todayBox) {
      todayBox.hidden = true;
    }

    if (!upcoming) {
      nextDateEl.textContent = "";
      nextNameEl.textContent = "No hay más eventos programados en el calendario.";
      return;
    }
    nextDateEl.textContent = formatLabel(upcoming.date);
    nextNameEl.textContent = upcoming.title;
  }

  function renderMonthCalendar(today) {
    const year = today.getFullYear();
    const month = today.getMonth();
    const header = document.getElementById("month-cal-header");
    const grid = document.getElementById("month-cal-grid");
    if (!header || !grid) return;

    header.textContent = `${MONTH_NAMES[month]} ${year}`;

    const eventsByDay = {};
    SCHOOL_EVENTS.forEach(e => {
      const [y, m] = e.date.split("-").map(Number);
      if (y === year && m - 1 === month) {
        const day = Number(e.date.split("-")[2]);
        eventsByDay[day] = eventsByDay[day] ? eventsByDay[day] + " · " + e.title : e.title;
      }
    });

    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = toDateKey(today);

    // Keep the day-of-week header row, remove any previously rendered day cells
    Array.from(grid.querySelectorAll(".day")).forEach(el => el.remove());

    for (let i = 0; i < startOffset; i++) {
      grid.appendChild(document.createElement("span"));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("span");
      cell.className = "day";
      cell.textContent = String(day);
      const cellKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (cellKey === todayKey) cell.classList.add("today");
      if (eventsByDay[day]) {
        cell.classList.add("event");
        cell.title = eventsByDay[day];
      }
      grid.appendChild(cell);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    renderNextEvent(today);
    renderMonthCalendar(today);
  });
})();
