const Quote = () => {
  return (
    <div>
        <blockquote className="text-2xl font-semibold ">
          <p className="font-mono">
            “The customer service I received was exceptional. The support team went above and beyond to address my
            concerns.”
          </p>
          <footer className="mt-4">
            <p className="font-bold">Jules Winnfield</p>
            <p className="text-gray-500">CEO, Acme Inc</p>
          </footer>
        </blockquote>
      </div>
  )
}

export default Quote
