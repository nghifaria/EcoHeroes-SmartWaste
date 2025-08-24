// This component is no longer used as the main entry point
// but kept for compatibility. The new app flow starts with Onboarding -> Auth -> Dashboard

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">EcoHeroes Loading...</h1>
        <p className="text-xl text-muted-foreground">Redirecting to main app...</p>
      </div>
    </div>
  );
};

export default Index;
