function FooterNote() {
  return (
    <div className="text-center">
      <p className="text-sm text-[#09529a] mb-4">
        <span className="font-bold">Dit is een interne oefening</span> om phishing te herkennen. 
        Er worden geen persoonsgegevens opgeslagen.
      </p>
      <a
        href="#"
        className="text-sm text-[#09529a] hover:text-[#074078] transition-colors inline-flex items-center gap-1 font-bold"
        onClick={(e) => {
          e.preventDefault()
          alert('Dit is een placeholder voor meer informatie over veilig werken.')
        }}
      >
        Meer leren over veilig werken →
      </a>
    </div>
  )
}

export default FooterNote
