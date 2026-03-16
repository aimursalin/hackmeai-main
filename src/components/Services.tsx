import { useNavigate } from "react-router-dom";
import { services } from "@/data/services";
import SaaspoFeatureSectionsTypebot from "@/components/ui/feature-sections-typebot";

const Services = () => {
  const navigate = useNavigate();

  const mappedFeatures = services.map((service, i) => ({
    title: service.title,
    description: service.description,
    illustration: (i % 3 === 0 ? "marketing" : i % 3 === 1 ? "support" : "sales") as "marketing" | "support" | "sales",
    onClick: () => navigate(`/services/${service.slug}`)
  }));

  return (
    <div id="services">
      <SaaspoFeatureSectionsTypebot 
        heading="What we craft"
        subheading="Hand-made design solutions tailored for dominance."
        features={mappedFeatures}
      />
    </div>
  );
};

export default Services;
