import { Avatar, AvatarFallback, AvatarImage, initials } from "@/components/ui/avatar"

const photo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23a1a1aa'/><stop offset='1' stop-color='%2327272a'/></linearGradient></defs><rect width='40' height='40' fill='url(%23g)'/></svg>"

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>{initials("Paul McCartney")}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>{initials("John Lennon")}</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>{initials("George Harrison")}</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={photo} alt="Ringo Starr" />
        <AvatarFallback>{initials("Ringo Starr")}</AvatarFallback>
      </Avatar>
    </div>
  )
}
