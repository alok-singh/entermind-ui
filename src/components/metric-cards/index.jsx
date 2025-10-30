import Card from "../card";

const MetricCards = (props) => {
  return (
    <div className="grid gap-6 grid-cols-4 mb-6">
      {props.cards.map((card) => {
        return (
          <Card key={card.id} className={card.cardClassName}>
            <h3 className={card.titleClassName}>{card.title}</h3>
            <div className={card.valueClassName}>{card.value}</div>
            <p className={card.descriptionClassName}>{card.description}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricCards;
