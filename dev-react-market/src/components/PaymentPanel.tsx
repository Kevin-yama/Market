import { useState } from "react";

interface PaymentProps {
  total: number;
}

const PaymentPanel = ({ total }: PaymentProps) => {
  const [received, setReceived] = useState<number>(0);

  const change = received - total;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white fw-bold">Resumen de Pago</div>

      <div className="card-body">
        <div className="row">
          {/* RECIBIDO */}
          <div className="col-6">
            <label className="form-label fw-semibold">Recibido</label>
            <input
              type="number"
              className="form-control"
              value={received}
              onChange={(e) => setReceived(Number(e.target.value))}
            />
          </div>

          {/* TOTAL + CAMBIO */}
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Total</label>
              <div className="form-control bg-light text-end">${total}</div>
            </div>

            <div>
              <label className="form-label fw-semibold">Cambio</label>
              <div
                className={`form-control fw-bold text-end ${
                  change < 0 ? "text-danger" : "text-success"
                }`}
              >
                ${change}
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-success w-100 mt-3" disabled={change < 0}>
          Cobrar
        </button>
      </div>
    </div>
  );
};

export default PaymentPanel;
