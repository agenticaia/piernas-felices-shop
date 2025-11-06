import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Activity, Heart, Clock, Footprints, Flame, Sunrise, Phone } from "lucide-react";

interface TestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type RiskLevel = "LEVE" | "MODERADO" | "AVANZADO";

interface TestData {
  age: string;
  gender: string;
  workType: string;
  hoursStanding: string;
  legFeeling: string;
  visibleSigns: string[];
  symptomFrequency: string;
  familyHistory: string;
  circulation: string;
  pregnancy: string;
  overweight: string;
  smoking: string;
  canSit: string;
  footwear: string;
  usedCompression: string;
  concern: string;
  treatment: string;
  care: string[];
  name: string;
  whatsapp: string;
  email: string;
}

export const TestDialog = ({ open, onOpenChange }: TestDialogProps) => {
  const [step, setStep] = useState(1);
  const [testData, setTestData] = useState<Partial<TestData>>({
    visibleSigns: [],
    care: [],
  });
  const [result, setResult] = useState<RiskLevel | null>(null);

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const calculateResult = (): RiskLevel => {
    let score = 0;

    // Hours standing
    if (testData.hoursStanding === "8-10") score += 2;
    if (testData.hoursStanding === "10+") score += 3;

    // Leg feeling
    if (testData.legFeeling === "tired") score += 1;
    if (testData.legFeeling === "painful") score += 2;
    if (testData.legFeeling === "cramps") score += 3;

    // Visible signs
    if (testData.visibleSigns?.includes("spider")) score += 1;
    if (testData.visibleSigns?.includes("veins")) score += 2;
    if (testData.visibleSigns?.includes("swelling")) score += 2;
    if (testData.visibleSigns?.includes("color")) score += 3;

    // Symptom frequency
    if (testData.symptomFrequency === "3-5") score += 2;
    if (testData.symptomFrequency === "daily") score += 3;

    // Family history
    if (testData.familyHistory === "yes") score += 2;

    // Circulation issues
    if (testData.circulation === "yes") score += 3;

    // Pregnancy
    if (testData.pregnancy === "2+") score += 1;

    // Can't sit
    if (testData.canSit === "never") score += 2;

    // Concern level
    if (testData.concern === "seeking") score += 2;

    if (score <= 5) return "LEVE";
    if (score <= 12) return "MODERADO";
    return "AVANZADO";
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else if (step === 6) {
      // Calculate result
      const calculatedResult = calculateResult();
      setResult(calculatedResult);
      setStep(7);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const getWhatsAppMessage = (productName: string) => {
    const name = testData.name || "Cliente";
    return `Hola, acabo de hacer el Test Online de Várices y Trabajo de Pie en piernasligeras.com. Mi resultado ha sido: ${result}. Me interesa el producto: ${productName}. ¿Me pueden ayudar a elegir talla y completar la compra?`;
  };

  const getWhatsAppLink = (productName: string) => {
    const phone = "51904541341";
    const message = getWhatsAppMessage(productName);
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Datos básicos para personalizar tu resultado</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    value={testData.age || ""}
                    onChange={(e) => setTestData({ ...testData, age: e.target.value })}
                    placeholder="Tu edad"
                  />
                </div>

                <div>
                  <Label>Sexo</Label>
                  <RadioGroup
                    value={testData.gender}
                    onValueChange={(value) => setTestData({ ...testData, gender: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer">
                        Hombre
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer">
                        Mujer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">
                        Prefiero no decirlo
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>¿En qué trabajas principalmente?</Label>
                  <RadioGroup
                    value={testData.workType}
                    onValueChange={(value) => setTestData({ ...testData, workType: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="health" id="health" />
                      <Label htmlFor="health" className="font-normal cursor-pointer">
                        Enfermería / personal de salud
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="retail" id="retail" />
                      <Label htmlFor="retail" className="font-normal cursor-pointer">
                        Retail (tienda, cajera, supermercado)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beauty" id="beauty" />
                      <Label htmlFor="beauty" className="font-normal cursor-pointer">
                        Belleza (peluquería, barbería, estética)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="service" />
                      <Label htmlFor="service" className="font-normal cursor-pointer">
                        Restaurantes / hoteles / servicios
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="work-other" />
                      <Label htmlFor="work-other" className="font-normal cursor-pointer">
                        Otro trabajo de pie
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>¿Cuántas horas al día pasas de pie?</Label>
                  <RadioGroup
                    value={testData.hoursStanding}
                    onValueChange={(value) => setTestData({ ...testData, hoursStanding: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="<4" id="hours1" />
                      <Label htmlFor="hours1" className="font-normal cursor-pointer">
                        Menos de 4 horas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4-8" id="hours2" />
                      <Label htmlFor="hours2" className="font-normal cursor-pointer">
                        Entre 4 y 8 horas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8-10" id="hours3" />
                      <Label htmlFor="hours3" className="font-normal cursor-pointer">
                        Entre 8 y 10 horas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10+" id="hours4" />
                      <Label htmlFor="hours4" className="font-normal cursor-pointer">
                        Más de 10 horas
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Mientras más honest@ seas, más útil será tu resultado. No compartimos tus datos con terceros.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">¿Cómo se sienten tus piernas al final del día?</h3>

            <div className="space-y-4">
              <div>
                <Label>Al final del día, ¿cómo describirías tus piernas?</Label>
                <RadioGroup
                  value={testData.legFeeling}
                  onValueChange={(value) => setTestData({ ...testData, legFeeling: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="font-normal cursor-pointer">
                      Ligeras, casi sin molestias
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tired" id="tired" />
                    <Label htmlFor="tired" className="font-normal cursor-pointer">
                      Cansadas y pesadas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="painful" id="painful" />
                    <Label htmlFor="painful" className="font-normal cursor-pointer">
                      Dolorosas o con sensación de "ardor"
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cramps" id="cramps" />
                    <Label htmlFor="cramps" className="font-normal cursor-pointer">
                      Siento calambres o pinchazos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Has notado alguno de estos signos? (puedes marcar varios)</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { id: "spider", label: "Arañitas vasculares o ramitas rojas/azules" },
                    { id: "veins", label: "Venas más marcadas o abultadas" },
                    { id: "swelling", label: "Hinchazón en tobillos o pies" },
                    { id: "color", label: "Cambio de color en la piel" },
                    { id: "none", label: "Ninguno de los anteriores" },
                  ].map((sign) => (
                    <div key={sign.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={sign.id}
                        checked={testData.visibleSigns?.includes(sign.id)}
                        onChange={(e) => {
                          const current = testData.visibleSigns || [];
                          if (e.target.checked) {
                            setTestData({ ...testData, visibleSigns: [...current, sign.id] });
                          } else {
                            setTestData({ ...testData, visibleSigns: current.filter((s) => s !== sign.id) });
                          }
                        }}
                        className="w-4 h-4 rounded border-input"
                      />
                      <Label htmlFor={sign.id} className="font-normal cursor-pointer">
                        {sign.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>¿Con qué frecuencia notas estos síntomas?</Label>
                <RadioGroup
                  value={testData.symptomFrequency}
                  onValueChange={(value) => setTestData({ ...testData, symptomFrequency: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="freq1" />
                    <Label htmlFor="freq1" className="font-normal cursor-pointer">
                      Casi nunca
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2" id="freq2" />
                    <Label htmlFor="freq2" className="font-normal cursor-pointer">
                      1–2 veces por semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5" id="freq3" />
                    <Label htmlFor="freq3" className="font-normal cursor-pointer">
                      3–5 veces por semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="freq4" />
                    <Label htmlFor="freq4" className="font-normal cursor-pointer">
                      Todos los días
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Un poco sobre tu historia de salud</h3>

            <div className="space-y-4">
              <div>
                <Label>¿Hay familiares cercanos con várices?</Label>
                <RadioGroup
                  value={testData.familyHistory}
                  onValueChange={(value) => setTestData({ ...testData, familyHistory: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fam-no" />
                    <Label htmlFor="fam-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fam-yes" />
                    <Label htmlFor="fam-yes" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Alguna vez te han dicho que tienes problemas de circulación o coágulos?</Label>
                <RadioGroup
                  value={testData.circulation}
                  onValueChange={(value) => setTestData({ ...testData, circulation: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="circ-no" />
                    <Label htmlFor="circ-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="circ-yes" />
                    <Label htmlFor="circ-yes" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Has estado embarazada? (mujeres)</Label>
                <RadioGroup
                  value={testData.pregnancy}
                  onValueChange={(value) => setTestData({ ...testData, pregnancy: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="preg-no" />
                    <Label htmlFor="preg-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="preg-1" />
                    <Label htmlFor="preg-1" className="font-normal cursor-pointer">
                      Sí, una vez
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2+" id="preg-2" />
                    <Label htmlFor="preg-2" className="font-normal cursor-pointer">
                      Sí, dos o más veces
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Tienes sobrepeso según tu médico?</Label>
                <RadioGroup
                  value={testData.overweight}
                  onValueChange={(value) => setTestData({ ...testData, overweight: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="weight-no" />
                    <Label htmlFor="weight-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="weight-yes" />
                    <Label htmlFor="weight-yes" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsure" id="weight-unsure" />
                    <Label htmlFor="weight-unsure" className="font-normal cursor-pointer">
                      No estoy segur@
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Fumas actualmente?</Label>
                <RadioGroup
                  value={testData.smoking}
                  onValueChange={(value) => setTestData({ ...testData, smoking: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="smoke-never" />
                    <Label htmlFor="smoke-never" className="font-normal cursor-pointer">
                      No, nunca
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ex" id="smoke-ex" />
                    <Label htmlFor="smoke-ex" className="font-normal cursor-pointer">
                      Soy exfumador(a)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="<10" id="smoke-light" />
                    <Label htmlFor="smoke-light" className="font-normal cursor-pointer">
                      Sí, menos de 10 cigarrillos al día
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10+" id="smoke-heavy" />
                    <Label htmlFor="smoke-heavy" className="font-normal cursor-pointer">
                      Sí, más de 10 al día
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Tu día a día en el trabajo</h3>

            <div className="space-y-4">
              <div>
                <Label>¿Puedes sentarte a descansar al menos 5 minutos cada hora?</Label>
                <RadioGroup
                  value={testData.canSit}
                  onValueChange={(value) => setTestData({ ...testData, canSit: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="always" id="sit-always" />
                    <Label htmlFor="sit-always" className="font-normal cursor-pointer">
                      Casi siempre
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="sit-sometimes" />
                    <Label htmlFor="sit-sometimes" className="font-normal cursor-pointer">
                      A veces
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="sit-never" />
                    <Label htmlFor="sit-never" className="font-normal cursor-pointer">
                      Casi nunca
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Qué tipo de calzado usas?</Label>
                <RadioGroup
                  value={testData.footwear}
                  onValueChange={(value) => setTestData({ ...testData, footwear: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sneakers" id="shoe1" />
                    <Label htmlFor="shoe1" className="font-normal cursor-pointer">
                      Zapatillas cómodas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low-heel" id="shoe2" />
                    <Label htmlFor="shoe2" className="font-normal cursor-pointer">
                      Zapatos cerrados con poco taco
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heel" id="shoe3" />
                    <Label htmlFor="shoe3" className="font-normal cursor-pointer">
                      Zapatos con taco medio o alto
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flat" id="shoe4" />
                    <Label htmlFor="shoe4" className="font-normal cursor-pointer">
                      Sandalias / calzado muy plano
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Has usado medias de compresión?</Label>
                <RadioGroup
                  value={testData.usedCompression}
                  onValueChange={(value) => setTestData({ ...testData, usedCompression: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="comp-never" />
                    <Label htmlFor="comp-never" className="font-normal cursor-pointer">
                      No, nunca
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="comp-sometimes" />
                    <Label htmlFor="comp-sometimes" className="font-normal cursor-pointer">
                      Sí, pero no las uso siempre
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="comp-daily" />
                    <Label htmlFor="comp-daily" className="font-normal cursor-pointer">
                      Sí, y las uso casi todos los días
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Cuánto te preocupa la salud de tus piernas?</Label>
                <RadioGroup
                  value={testData.concern}
                  onValueChange={(value) => setTestData({ ...testData, concern: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="little" id="concern1" />
                    <Label htmlFor="concern1" className="font-normal cursor-pointer">
                      Poco, casi no lo pienso
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="some" id="concern2" />
                    <Label htmlFor="concern2" className="font-normal cursor-pointer">
                      Algo, pero no he hecho nada aún
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seeking" id="concern3" />
                    <Label htmlFor="concern3" className="font-normal cursor-pointer">
                      Mucho, y estoy buscando soluciones
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">¿Qué has intentado hasta ahora?</h3>

            <div className="space-y-4">
              <div>
                <Label>¿Te has realizado algún tratamiento para várices?</Label>
                <RadioGroup
                  value={testData.treatment}
                  onValueChange={(value) => setTestData({ ...testData, treatment: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="treat-none" />
                    <Label htmlFor="treat-none" className="font-normal cursor-pointer">
                      No, ninguno
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="injection" id="treat-inj" />
                    <Label htmlFor="treat-inj" className="font-normal cursor-pointer">
                      Sí, inyecciones (esclerosis)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="laser" id="treat-laser" />
                    <Label htmlFor="treat-laser" className="font-normal cursor-pointer">
                      Sí, láser u otro procedimiento
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsure" id="treat-unsure" />
                    <Label htmlFor="treat-unsure" className="font-normal cursor-pointer">
                      Sí, pero no recuerdo el nombre
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>¿Sigues algún cuidado para tus piernas? (puedes marcar varios)</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { id: "elevate", label: "Elevo las piernas al llegar a casa" },
                    { id: "exercise", label: "Hago ejercicios o caminatas regularmente" },
                    { id: "creams", label: "Uso cremas / geles para piernas cansadas" },
                    { id: "compression", label: "Uso medias de compresión" },
                    { id: "none-care", label: "Ninguno de los anteriores" },
                  ].map((careItem) => (
                    <div key={careItem.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={careItem.id}
                        checked={testData.care?.includes(careItem.id)}
                        onChange={(e) => {
                          const current = testData.care || [];
                          if (e.target.checked) {
                            setTestData({ ...testData, care: [...current, careItem.id] });
                          } else {
                            setTestData({ ...testData, care: current.filter((c) => c !== careItem.id) });
                          }
                        }}
                        className="w-4 h-4 rounded border-input"
                      />
                      <Label htmlFor={careItem.id} className="font-normal cursor-pointer">
                        {careItem.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">¡Casi listo!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Déjanos tus datos para mostrarte tu resultado personalizado
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={testData.name || ""}
                  onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp * (incluye código de país)</Label>
                <Input
                  id="whatsapp"
                  value={testData.whatsapp || ""}
                  onChange={(e) => setTestData({ ...testData, whatsapp: e.target.value })}
                  placeholder="+51 999 123 777"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={testData.email || ""}
                  onChange={(e) => setTestData({ ...testData, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                * Campos obligatorios. Tu información es confidencial y nunca será compartida.
              </p>
            </div>
          </div>
        );

      case 7:
        return renderResult();

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const resultData = {
      LEVE: {
        title: "RIESGO LEVE",
        description:
          "Según tus respuestas, es posible que presentes una insuficiencia venosa leve. Tus venas ya están empezando a resentir las horas de pie, pero estamos en una fase en la que es mucho más fácil prevenir que lamentar.",
        recommendations: [
          { icon: <Activity className="w-6 h-6" />, text: "Muévete con frecuencia" },
          { icon: <Heart className="w-6 h-6" />, text: "Cuida tu peso" },
          { icon: <Sunrise className="w-6 h-6" />, text: "Eleva las piernas" },
          { icon: <Footprints className="w-6 h-6" />, text: "Camina regularmente" },
        ],
        compression: "12–17 mmHg hasta la rodilla",
        products: ["Calcetines hasta rodilla 12–17 mmHg – Talón, puntera y plantilla reforzados"],
      },
      MODERADO: {
        title: "RIESGO MODERADO",
        description:
          "Según tus respuestas, es posible que presentes una insuficiencia venosa moderada. Tus venas ya están mostrando signos más evidentes del esfuerzo de trabajar de pie muchas horas. Es importante que actúes cuanto antes para evitar que el problema avance.",
        recommendations: [
          { icon: <Activity className="w-6 h-6" />, text: "Mantén una rutina de ejercicio" },
          { icon: <Heart className="w-6 h-6" />, text: "Procura alimentación equilibrada" },
          { icon: <Flame className="w-6 h-6" />, text: "Evita el calor intenso directo" },
          { icon: <Sunrise className="w-6 h-6" />, text: "Eleva las piernas regularmente" },
        ],
        compression: "18–22 mmHg hasta la rodilla",
        products: [
          "Calcetines hasta rodilla 18–22 mmHg – Puntera abierta, talón reforzado",
          "Calcetines hasta muslo 18–22 mmHg – Volante elástico con silicona hipoalergénica",
        ],
      },
      AVANZADO: {
        title: "RIESGO AVANZADO",
        description:
          "Según tus respuestas, es posible que presentes una insuficiencia venosa avanzada. Tus venas y tus piernas están sufriendo de manera importante el efecto de las horas de pie. Es muy importante que pidas cita con tu médico o especialista vascular lo antes posible.",
        recommendations: [
          { icon: <Activity className="w-6 h-6" />, text: "Mantén actividad física permitida" },
          { icon: <Flame className="w-6 h-6" />, text: "Evita el calor directo" },
          { icon: <Sunrise className="w-6 h-6" />, text: "Eleva piernas varias veces al día" },
          { icon: <Clock className="w-6 h-6" />, text: "Descansa todo lo posible" },
        ],
        compression: "22–27 mmHg",
        products: [
          "Calcetines hasta muslo 22–27 mmHg – Volante elástico con silicona hipoalergénica",
          "Calcetines hasta rodilla 22–27 mmHg – Talón, puntera y plantilla reforzados",
        ],
      },
    };

    const data = resultData[result];

    return (
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Resultado de tu Test: {data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>

        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Recomendaciones generales:</h4>
          <div className="grid grid-cols-2 gap-3">
            {data.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="text-accent">{rec.icon}</div>
                <span>{rec.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Recomendación de medias de compresión:</h4>
          <p className="text-sm font-medium text-primary mb-3">{data.compression}</p>
          <div className="space-y-2">
            {data.products.map((product, idx) => (
              <div key={idx} className="bg-background rounded p-3">
                <p className="text-sm mb-2">{product}</p>
                <Button size="sm" className="w-full" onClick={() => window.open(getWhatsAppLink(product), "_blank")}>
                  <Phone className="w-4 h-4 mr-2" />
                  Quiero este producto por WhatsApp
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="w-full bg-accent hover:bg-accent/90"
            onClick={() => window.open(getWhatsAppLink("Asesoría general"), "_blank")}
          >
            <Phone className="w-5 h-5 mr-2" />
            Quiero hablar con un asesor por WhatsApp
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Este test es orientativo y no sustituye una consulta médica profesional.
        </p>
      </div>
    );
  };

  const canProceed = () => {
    if (step === 6) {
      return testData.name && testData.whatsapp;
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step < 7 ? "Haz el Test Online de Várices Gratis" : "Tu Resultado"}
          </DialogTitle>
          {step < 7 && (
            <p className="text-sm text-muted-foreground">
              Descubre en 2 minutos cómo afectan las horas de pie a tus piernas
            </p>
          )}
        </DialogHeader>

        {step < 7 && (
          <div className="px-6">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Paso {step} de {totalSteps - 1}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6">{renderStep()}</div>

        {step < 7 && (
          <div className="flex gap-3 px-6 pb-6 pt-4 border-t">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Atrás
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
              {step === 6 ? "Ver mi resultado" : "Siguiente"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
