class AiClientBase
  def generate(prompt)
    raise NotImplementedError, "#{self.class}#generate を実装してください"
  end
end
