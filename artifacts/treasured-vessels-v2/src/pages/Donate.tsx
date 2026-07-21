import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Heart, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Donate() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState("");

  const amounts = isMonthly ? ["15", "30", "50", "100"] : ["25", "50", "100", "250"];

  const handleAmountSelect = (val: string) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-12 pb-24">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heart className="w-12 h-12 text-brand-pink mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum mb-4">Invest in a Girl's Future</h1>
          <p className="text-lg text-brand-charcoal/70">
            Your generous donation directly funds education, vocational training, and safe spaces for vulnerable young women in Eastern Uganda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Donation Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[32px] shadow-xl border border-border">
            
            {/* Toggle */}
            <div className="flex bg-brand-paleblue rounded-full p-1 mb-8">
              <button 
                onClick={() => setIsMonthly(false)}
                className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${!isMonthly ? 'bg-white text-brand-plum shadow-sm' : 'text-brand-charcoal/60 hover:text-brand-plum'}`}
              >
                Give Once
              </button>
              <button 
                onClick={() => setIsMonthly(true)}
                className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 ${isMonthly ? 'bg-white text-brand-plum shadow-sm' : 'text-brand-charcoal/60 hover:text-brand-plum'}`}
              >
                <Heart className="w-4 h-4 text-brand-pink" /> Give Monthly
              </button>
            </div>

            {/* Amounts */}
            <div className="mb-8">
              <Label className="text-brand-plum font-semibold mb-4 block text-base">Select Amount (USD)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {amounts.map(val => (
                  <button
                    key={val}
                    onClick={() => handleAmountSelect(val)}
                    className={`py-4 rounded-2xl border-2 font-bold text-lg transition-all ${
                      amount === val 
                        ? 'border-brand-pink bg-brand-pink text-white' 
                        : 'border-border text-brand-charcoal hover:border-brand-pink/50'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/50 font-bold">$</span>
                <Input 
                  type="number" 
                  placeholder="Custom Amount" 
                  value={customAmount}
                  onChange={handleCustomAmount}
                  className={`pl-8 h-14 rounded-2xl text-lg ${amount === 'custom' ? 'border-brand-pink ring-1 ring-brand-pink' : ''}`}
                />
              </div>
            </div>

            {/* Fund Allocation */}
            <div className="mb-10">
              <Label className="text-brand-plum font-semibold mb-4 block text-base">Direct my donation to</Label>
              <RadioGroup defaultValue="where-needed" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "where-needed", label: "Where needed most" },
                  { id: "education", label: "Girls' Education" },
                  { id: "skills", label: "Skills Training" },
                  { id: "health", label: "Menstrual Health" }
                ].map(fund => (
                  <div key={fund.id} className="flex items-center space-x-2 border border-border p-3 rounded-xl hover:bg-brand-paleblue/50 transition-colors">
                    <RadioGroupItem value={fund.id} id={fund.id} />
                    <Label htmlFor={fund.id} className="flex-1 cursor-pointer">{fund.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-brand-gold hover:bg-yellow-400 text-brand-charcoal font-bold text-lg shadow-lg mb-6">
              Continue to Payment
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-gray-50 py-3 rounded-lg">
              <Lock className="w-4 h-4" /> Secure, encrypted transaction.
            </div>
            <p className="text-center text-[11px] text-muted-foreground mt-4">
              *This is a frontend demonstration site. No real payment processing is wired up.
            </p>

          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-plum text-white p-8 rounded-[32px] shadow-lg">
              <h3 className="font-serif text-2xl mb-6">What Your Gift Does</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$15</strong> provides a girl with a reusable sanitary kit for a year.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$50</strong> keeps a vulnerable girl in school for a full academic term.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$150</strong> buys a sewing machine for a vocational graduate to start her business.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-border">
              <h3 className="font-serif text-xl text-brand-plum mb-4">Financial Transparency</h3>
              <p className="text-sm text-brand-charcoal/70 mb-4">
                We are committed to accountable stewardship of every donation. Read our policies to understand how funds are allocated and reported.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/policies/donation" className="text-brand-blue text-sm font-semibold hover:underline">Read our Donation Policy</Link>
                <Link href="/about/governance" className="text-brand-blue text-sm font-semibold hover:underline">Governance & Financial Reporting</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
