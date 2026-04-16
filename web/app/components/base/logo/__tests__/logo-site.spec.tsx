import { render, screen } from '@testing-library/react'
import useTheme from '@/hooks/use-theme'
import { Theme } from '@/types/app'
import LogoSite from '../logo-site'

vi.mock('@/hooks/use-theme', () => ({
  default: vi.fn(),
}))

vi.mock('@/utils/var', () => ({
  basePath: '/test-base-path',
}))

describe('LogoSite', () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Theme.light,
      themes: ['light', 'dark'],
      setTheme: vi.fn(),
      resolvedTheme: Theme.light,
      systemTheme: Theme.light,
      forcedTheme: undefined,
    } as ReturnType<typeof useTheme>)
  })

  it('renders correctly with default props', () => {
    render(<LogoSite />)
    const img = screen.getByRole('img', { name: /logo/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-base-path/logo/logo-site.png')
  })

  it('applies custom className correctly', () => {
    const customClass = 'custom-site-class'
    render(<LogoSite className={customClass} />)
    const img = screen.getByRole('img', { name: /logo/i })
    expect(img).toHaveClass(customClass)
  })

  it('uses dark site mark in dark theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Theme.dark,
      themes: ['light', 'dark'],
      setTheme: vi.fn(),
      resolvedTheme: Theme.dark,
      systemTheme: Theme.dark,
      forcedTheme: undefined,
    } as ReturnType<typeof useTheme>)

    render(<LogoSite />)
    const img = screen.getByRole('img', { name: /logo/i })
    expect(img).toHaveAttribute('src', '/test-base-path/logo/logo-site-dark.png')
  })
})
