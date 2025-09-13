import React, { useState } from "react";

/**
 * Creación de Rutinas con Bootstrap 5.3.7
 * Reemplaza estilos personalizados por clases de Bootstrap
 */
export default function RoutineForm() {
  // 📌 Estados del formulario
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Hipertrofia");
  const [level, setLevel] = useState("Principiante");
  const [weeks, setWeeks] = useState(4);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [exercises, setExercises] = useState("");
  const [notes, setNotes] = useState("");

  // 📌 Sucursales
  const [branches, setBranches] = useState(["Central", "Norte", "Sur"]);
  const [branch, setBranch] = useState("Central");
  const [newBranch, setNewBranch] = useState("");
  const [showAddBranch, setShowAddBranch] = useState(false);

  // 📌 Control de envío
  const [submitted, setSubmitted] = useState(false);

  // ✅ Validación mínima
  function validate() {
    return name.trim() !== "" && exercises.trim() !== "";
  }

  // 📤 Envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      alert("Completa al menos el Nombre de la rutina y los Ejercicios.");
      return;
    }
    const payload = { name, goal, level, weeks, daysPerWeek, exercises, notes, branch };
    console.log("Rutina creada:", payload);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  // ➕ Agregar sucursal
  function addBranch() {
    const b = newBranch.trim();
    if (b && !branches.includes(b)) {
      setBranches([...branches, b]);
      setBranch(b);
      setNewBranch("");
      setShowAddBranch(false);
    }
  }

  // 🎨 Renderizado
  return (
    <div className="container py-4">
      <div className="card shadow-lg">
        <div className="card-body">
          {/* 🏷️ Título */}
          <h3 className="card-title mb-4">Creación de Rutinas</h3>

          {/* 📑 Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Nombre */}
              <div className="col-12">
                <label className="form-label">Nombre de la Rutina</label>
                <input
                  className="form-control"
                  placeholder="Full Body"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Objetivo */}
              <div className="col-md-6">
                <label className="form-label">Objetivo</label>
                <select
                  className="form-select"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option>Hipertrofia</option>
                  <option>Definición</option>
                  <option>Fuerza</option>
                  <option>Resistencia</option>
                </select>
              </div>

              {/* Nivel */}
              <div className="col-md-6">
                <label className="form-label">Nivel</label>
                <select
                  className="form-select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Principiante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </div>

              {/* Duración */}
              <div className="col-md-6">
                <label className="form-label">Duración (semanas)</label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  className="form-control"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                />
              </div>

              {/* Días por semana */}
              <div className="col-md-6">
                <label className="form-label">Días por semana</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="form-control"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                />
              </div>

              {/* Ejercicios */}
              <div className="col-12">
                <label className="form-label">Ejercicios principales</label>
                <textarea
                  className="form-control"
                  placeholder="Sentadillas, press banca, dominadas..."
                  value={exercises}
                  onChange={(e) => setExercises(e.target.value)}
                />
              </div>

              {/* Notas */}
              <div className="col-12">
                <label className="form-label">Notas adicionales</label>
                <textarea
                  className="form-control"
                  placeholder="Detalle extra de la rutina"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Sucursal */}
              <div className="col-12">
                <label className="form-label">Sucursal</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    {branches.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowAddBranch((s) => !s)}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Nueva sucursal */}
              {showAddBranch && (
                <div className="col-12">
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Nueva sucursal"
                      value={newBranch}
                      onChange={(e) => setNewBranch(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addBranch}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              )}

              {/* Botón principal */}
              <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">
                  Crear Rutina
                </button>
              </div>
            </div>
          </form>

          {/* Mensaje de éxito */}
          {submitted && (
            <div className="alert alert-success mt-3 mb-0">
              ✅ Rutina creada (ver consola para el payload)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
