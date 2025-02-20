import { describe, it, expect} from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResponsiveComponents } from "./ResponsiveComponents";
import 'regenerator-runtime/runtime';


describe("ResponsiveComponents", () => {
  // Prueba 1: Verificar que el título se renderice
  it("renders the title", () => {
    render(<ResponsiveComponents />);
    const titleElement = screen.getByText(/Componentes Responsivos Interactivos/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Prueba 2: Verificar que el botón de toggle cambia el estado y el texto al hacer clic
  it("toggles the visibility of Component 1", async () => {
    render(<ResponsiveComponents />);
    
    // Encontramos el botón para mostrar el componente 1
    const toggleButton = screen.getByText(/Mostrar Componente 1/i);
    expect(toggleButton).toBeInTheDocument();

    // Simulamos el clic en el botón
    fireEvent.click(toggleButton);

    // Esperamos a que el texto del botón cambie a "Ocultar Componente 1"
    await waitFor(() => {
      expect(screen.getByText(/Ocultar Componente 1/i)).toBeInTheDocument();
    });
  });
});
