import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlayableCharacter } from '@/data/characters/characters'

export function DecisionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>/characters/{PlayableCharacter.ASTARION}.png</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent> */}
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  )
}
