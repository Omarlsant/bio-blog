import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar el correo electrónico con EmailJS
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("Correo enviado:", response.status, response.text);
        setShowModal(true);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error.text);
        alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-6 mb-6 relative">
      <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">
        ¡Déjanos un mensaje en <span className="text-green-800">Bio</span>{" "}
        <span className="text-green-600">Blog</span>! Te responderemos lo más
        pronto posible.
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="50"
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-600"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-green-600"
          >
            Mensaje (máx. 100 caracteres)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="100"
            required
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-colors"
        >
          Enviar
        </button>
      </form>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              ¡Mensaje enviado!
            </h3>
            <p className="text-sm text-gray-700">
              El mensaje ha sido enviado correctamente. Te responderemos lo más
              pronto posible.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-green-700 text-center mb-4">
          Opiniones de nuestros usuarios
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-green-800 font-semibold mb-2">Usuario 1</p>
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-sm font-medium text-gray-700 mt-2">
              "Excelente información sobre nutrición y salud. Muy recomendable
              para aquellos que buscan llevar un estilo de vida saludable."
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-green-800 font-semibold mb-2">Usuario 2</p>
            <p className="text-yellow-500">★★★★☆</p>
            <p className="text-sm font-medium text-gray-700 mt-2">
              "Visité el lugar recomendado por Bio Blog y fue una experiencia
              increíble. La comida era deliciosa y saludable, además de que el
              ambiente era muy acogedor. ¡Gracias!"
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-green-800 font-semibold mb-2">Usuario 3</p>
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-sm font-medium text-gray-700 mt-2">
              "Seguí las instrucciones sobre la dieta vegana y ha funcionado de
              maravilla. Me siento con más energía y he mejorado mi salud
              general. ¡Muy agradecido por la información tan valiosa!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
