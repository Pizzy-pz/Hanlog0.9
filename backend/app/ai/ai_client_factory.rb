class AiClientFactory
  PROVIDERS = {
    "openai" => OpenaiClient
  }.freeze

  def self.build
    provider = ENV.fetch("AI_PROVIDER", "openai")
    klass = PROVIDERS[provider] or raise ArgumentError, "未対応の AI プロバイダー: #{provider}"
    klass.new
  end
end
