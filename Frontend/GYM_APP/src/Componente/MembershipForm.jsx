import React, { useMemo, useState } from "react";

/** 
 * Registro de Membresías con Bootstrap 5.3.7
 */
export default function MembershipForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Mensual");
  const [startDate, setStartDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [months, setMonths] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [branches, setBranches] = useState(["Central", "Norte", "Sur"]);
  const [branch, setBranch] = useState("Central");
  const [newBranch, setNewBranch] = useState("");
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const endDate = useMemo(() => {
    const d = new Date(startDate);
    if (Number.isNaN(d.getTime())) return "";
    d.setMonth(d.getMonth() + Number(months));
    return d.toISOString().slice(0, 10);
  }, [startDate, months]);

  function validate() {
    const e = {};
    if (!firstName.trim()) e.firstName = "Requerido";
    if (!lastName.trim()) e.lastName = "Requerido";
    if (!/^[\d\s+()-]{8,}$/.test(phone)) e.phone = "Teléfono inválido";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Correo inválido";
    if (!price || Number(price) <= 0) e.price = "Precio inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      firstName,
      lastName,
      phone,
      email,
      plan,
      startDate,
      months: Number(months),
      endDate,
      paymentMethod,
      price: Number(price),
      branch,
      notes,
    };
    console.log("Membresía creada:", payload);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  function addBranch() {
    const name = newBranch.trim();
    if (!name) return;
    if (!branches.includes(name)) {
      setBranches([...branches, name]);
      setBranch(name);
      setNewBranch("");
      setShowAddBranch(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-3">Registro de Membresías</h3>
          <h6 className="text-muted mb-4">EL GYM</h6>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Nombre y Apellido */}
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  placeholder="Juan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="text-danger small">{errors.firstName}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  className="form-control"
                  placeholder="Pérez"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="text-danger small">{errors.lastName}</div>
                )}
              </div>

              {/* Teléfono y Correo */}
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  className="form-control"
                  placeholder="+502 5555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input
                  className="form-control"
                  placeholder="cliente@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

              {/* Plan, Inicio, Meses */}
              <div className="col-md-4">
                <label className="form-label">Plan</label>
                <select
                  className="form-select"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option>Mensual</option>
                  <option>Trimestral</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Inicio</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Meses</label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  className="form-control"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>

              {/* Fin, Método de pago, Precio */}
              <div className="col-md-4">
                <label className="form-label">Fin</label>
                <input className="form-control" value={endDate} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Método de pago</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                  <option>QR/Billetera</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Precio (Q)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-control"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && (
                  <div className="text-danger small">{errors.price}</div>
                )}
              </div>

              {/* Sucursal */}
              <div className="col-md-8">
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

              {/* Notas */}
              <div className="col-12">
                <label className="form-label">Notas</label>
                <textarea
                  className="form-control"
                  placeholder="Detalle de la membresía, restricciones, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Botón principal */}
              <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">
                  Crear Membresía
                </button>
              </div>
            </div>
          </form>

          {submitted && (
            <div className="alert alert-success mt-3">
              ✅ Membresía registrada (revisa la consola para ver el payload).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
