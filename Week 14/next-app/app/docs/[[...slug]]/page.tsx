
export default function page({ params }: {
  params: {
    slug: string[]
  }
}) {
  if (params.slug?.length === 2) {
    return (
      <div>
        <h1>Docs</h1>
        <h2>Feature: {params.slug[0]} </h2>
        <h2>Concept: {params.slug[1]} </h2>
      </div>
    )
  } else if (params.slug?.length === 1) {
    return (
      <div>
        <h1>Docs</h1>
        <h2>Feature: {params.slug[0]} </h2>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Docs</h1>
      </div>
    )
  }
}
