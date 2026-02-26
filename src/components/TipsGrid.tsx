import { motion } from 'framer-motion'

const phishingTips = [
  {
    title: 'Controleer de afzender',
    description: 'Kijk goed naar het e-mailadres van de afzender. Phishers gebruiken vaak adressen die lijken op echte, maar net iets afwijken.',
  },
  {
    title: 'Pas op voor urgentie',
    description: 'Berichten die je onder druk zetten om snel te handelen ("Nu klikken!", "Account geblokkeerd") zijn verdacht.',
  },
  {
    title: 'Hover over links',
    description: 'Ga met je muis over een link zonder te klikken. Zo zie je het echte URL-adres en kun je manipulatie herkennen.',
  },
  {
    title: 'Let op spelfouten',
    description: 'Professionele organisaties maken zelden fouten. Spelfouten en grammaticale fouten zijn rode vlaggen.',
  },
  {
    title: 'Verifieer inlogflows',
    description: 'Ga nooit via een e-mail naar je inlogpagina. Typ zelf de URL in of gebruik je bladwijzer.',
  },
]

const risks = [
  {
    title: 'Credential-diefstal',
    description: 'Aanvallers kunnen je inloggegevens stelen en toegang krijgen tot bedrijfssystemen.',
  },
  {
    title: 'Malware',
    description: 'Klikken kan leiden tot infectie met ransomware, spyware of andere kwaadaardige software.',
  },
  {
    title: 'Datalekken',
    description: 'Gecompromitteerde accounts kunnen leiden tot het lekken van gevoelige bedrijfsinformatie.',
  },
  {
    title: 'Reputatieschade',
    description: 'Een succesvolle aanval kan het vertrouwen in de organisatie en je functie schaden.',
  },
]

function TipsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Column A: Zo herken je phishing */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-[#bfcae2] rounded-lg p-5"
      >
        <h3 className="text-lg font-bold text-[#09529a] mb-4">
          🔍 Zo herken je phishing
        </h3>
        <ul className="space-y-3">
          {phishingTips.map((tip, index) => (
            <li key={index} className="text-sm text-[#09529a]">
              <span className="font-bold">{tip.title}:</span>{' '}
              {tip.description}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Column B: Risico's */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-[#bfcae2] rounded-lg p-5"
      >
        <h3 className="text-lg font-bold text-red-700 mb-4">
          ⚠️ Risico's van zomaar klikken
        </h3>
        <ul className="space-y-3">
          {risks.map((risk, index) => (
            <li key={index} className="text-sm text-[#09529a]">
              <span className="font-bold">{risk.title}:</span>{' '}
              {risk.description}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Column C: Wat te doen? */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-[#bfcae2] rounded-lg p-5"
      >
        <h3 className="text-lg font-bold text-green-700 mb-4">
          ✅ Wat te doen?
        </h3>
        <ul className="space-y-2 text-sm text-[#09529a] mb-6">
          <li>• Open geen verdachte bijlagen</li>
          <li>• Klik niet op onbekende links</li>
          <li>• Twijfel? Neem contact op met IT</li>
          <li>• Meld verdachte e-mails direct</li>
        </ul>
        <button
          type="button"
          className="w-full py-2.5 px-4 bg-[#09529a] hover:bg-[#074078] text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#bfcae2] focus:ring-offset-2"
          onClick={() => alert('Dit is een placeholder voor VIM-melding')}
        >
          Melden (VIM)
        </button>
      </motion.div>
    </div>
  )
}

export default TipsGrid
