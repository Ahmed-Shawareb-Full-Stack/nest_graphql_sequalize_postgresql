export default function SerializeGQLInput(GQLInput) {
  return JSON.parse(JSON.stringify(GQLInput));
}
