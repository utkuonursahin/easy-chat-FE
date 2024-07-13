export default function Page({ params }: { params: { room: string } }) {
    return <div>My Room: {params.room.replaceAll('_',' ')}</div>
}