import { render, screen } from '@testing-library/react'
import CyberpunkMemeGallery from '../components/CyberpunkMemeGallery'

const mockMemes = [
  {
    id: 1,
    title: 'Test Meme',
    image_url: 'https://test.com/image.jpg',
    upvotes: 10
  }
]

describe('CyberpunkMemeGallery', () => {
  it('renders memes correctly', () => {
    render(<CyberpunkMemeGallery memes={mockMemes} />)
    expect(screen.getByText('Test Meme')).toBeInTheDocument()
    expect(screen.getByText('↑ 10')).toBeInTheDocument()
  })
})