import { render, screen } from "@testing-library/react";
import { AirportCard } from "../airportCard";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }))
}))

const mockAirport = {
  airport_id: 1,
  airport_name: 'Test Airport',
  iata_code: 'TST',
  city: 'Test City',
  country_name: 'Test Country'
}

test('renderiza correctamente la tarjeta de aeropuerto', () => {
  render(<AirportCard airport={mockAirport} />)

  expect(screen.getByText('Test Airport')).toBeInTheDocument()
  expect(screen.getByText('TST')).toBeInTheDocument()
  expect(screen.getByText('Test City Test Country')).toBeInTheDocument()
})