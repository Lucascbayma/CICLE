const BASE_URL = 'http://localhost:3000';

describe('Testes E2E - Usuário', () => {

  // ─── CT01 ───────────────────────────────────────────────
  it('CT01 - Login com credenciais válidas de usuário', () => {
    cy.visit(BASE_URL);

    // Garante que o botão "Para Você" está ativo
    cy.contains('button', 'Para Você').click();

    // Preenche CPF e senha corretos
    cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
    cy.get('input[type="password"]').type('senha123');

    cy.contains('button', 'Entrar').click();

    // Deve redirecionar para /usuario
    cy.url().should('include', '/usuario');
    cy.contains('Análises').should('be.visible');
  });

  // ─── CT02 ───────────────────────────────────────────────
  it('CT02 - Login com CPF inválido exibe mensagem de erro', () => {
    cy.visit(BASE_URL);

    cy.contains('button', 'Para Você').click();

    cy.get('input[placeholder="123.456.789-01"]').type('000.000.000-00');
    cy.get('input[type="password"]').type('senha123');

    cy.contains('button', 'Entrar').click();

    cy.contains('CPF ou senha inválidos.').should('be.visible');
    cy.url().should('not.include', '/usuario');
  });

  // ─── CT03 ───────────────────────────────────────────────
  it('CT03 - Login com senha inválida exibe mensagem de erro', () => {
    cy.visit(BASE_URL);

    cy.contains('button', 'Para Você').click();

    cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
    cy.get('input[type="password"]').type('senhaerrada');

    cy.contains('button', 'Entrar').click();

    cy.contains('CPF ou senha inválidos.').should('be.visible');
    cy.url().should('not.include', '/usuario');
  });

  // ─── CT04 ───────────────────────────────────────────────
  it('CT04 - Página do usuário exibe os cards de análise', () => {
    cy.visit(BASE_URL);

    cy.contains('button', 'Para Você').click();
    cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
    cy.get('input[type="password"]').type('senha123');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/usuario');

    cy.contains('CO2 evitado no período').should('be.visible');
    cy.contains('Emissão Total de CO2').should('be.visible');
    cy.contains('Digital vs Físico').should('be.visible');
    cy.contains('Benchmark').should('be.visible');
    cy.contains('Cashback Verde').should('be.visible');
  });

  // ─── CT05 ───────────────────────────────────────────────
  it('CT05 - Alternância para aba Empresa no login', () => {
    cy.visit(BASE_URL);

    cy.contains('button', 'Para Empresas').click();

    cy.get('input[placeholder="Ex: EDENRED-1234"]').should('be.visible');
    cy.contains('Código da Empresa').should('be.visible');
  });

});

// ─── CT06 ───────────────────────────────────────────────
it('CT06 - Login com campos vazios exibe mensagem de erro', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.contains('button', 'Entrar').click();

  cy.contains('CPF ou senha inválidos.').should('be.visible');
  cy.url().should('not.include', '/usuario');
});

// ─── CT07 ───────────────────────────────────────────────
it('CT07 - Login com CPF em formato inválido exibe mensagem de erro', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('abc');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.contains('CPF ou senha inválidos.').should('be.visible');
  cy.url().should('not.include', '/usuario');
});

// ─── CT08 ───────────────────────────────────────────────
it('CT08 - Página do usuário exibe cards "Em breve"', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');
  cy.contains('Histórico de emissões — Em breve').should('be.visible');
  cy.contains('Score de sustentabilidade — Em breve').should('be.visible');
  cy.contains('Relatório mensal — Em breve').should('be.visible');
});

// ─── CT09 ───────────────────────────────────────────────
it('CT09 - Sidebar está visível na página do usuário', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');
  cy.get('aside').should('be.visible');
});

// ─── CT10 ───────────────────────────────────────────────
it('CT10 - Header exibe logo e saudação ao usuário', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');
  cy.contains('Olá, Usuário!').should('be.visible');
  cy.get('img[alt="Cicle Logo"]').should('be.visible');
});

// ─── CT11 ───────────────────────────────────────────────
it('CT11 - Sidebar expande ao clicar no botão hamburguer', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');
  cy.get('aside').find('button').first().click();
  cy.contains('Análise').should('be.visible');
  cy.contains('Calculadora').should('be.visible');
  cy.contains('Gamificação').should('be.visible');
  cy.contains('Sair').should('be.visible');
});

// ─── CT12 ───────────────────────────────────────────────
it('CT12 - Botão Sair redireciona para a tela de login', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');

  // Abre a sidebar e clica em Sair
  cy.get('aside').find('button').first().click();
  cy.contains('Sair').click();

  cy.url().should('eq', `${BASE_URL}/`);
  cy.contains('button', 'Para Você').should('be.visible');
});

// ─── CT13 ───────────────────────────────────────────────
it('CT13 - Navegação da sidebar para Gamificação funciona', () => {
  cy.visit(BASE_URL);

  cy.contains('button', 'Para Você').click();
  cy.get('input[placeholder="123.456.789-01"]').type('123.456.789-01');
  cy.get('input[type="password"]').type('senha123');
  cy.contains('button', 'Entrar').click();

  cy.url().should('include', '/usuario');

  cy.get('aside').find('button').first().click();
  cy.contains('Gamificação').click();

  cy.url().should('include', '/gamificacao');
});