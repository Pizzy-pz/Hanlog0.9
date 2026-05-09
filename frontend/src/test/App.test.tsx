import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import App from "../App"

describe("App", () => {
  it("未認証時はログインページを表示する", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    )
    expect(screen.getByRole("heading", { name: "ログイン" })).toBeInTheDocument()
  })
})
