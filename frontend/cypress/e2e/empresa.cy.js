const BASE_URL = 'http://192.168.0.11:3000';

describe('Testes E2E - Empresa (Painel de Impacto ESG)', () => {

  beforeEach(() => {
    cy.visit(BASE_URL); 
    
    cy.contains('Para Empresas').click();
    
    cy.get('input').first().type('EDENRED-1234');
    cy.get('input[type="password"]').type('empresa123');
    
    cy.contains('button', 'Entrar').click();
    cy.url().should('not.include', '/login');
    
    cy.contains('Painel de Impacto ESG').scrollIntoView();
  });

  // ─── CT01 ───────────────────────────────────────────────
  it('CT01 - Interação completa com a Calculadora Ambiental', () => {
    cy.contains('Calculadora Ambiental').click();
    cy.contains('Gestão de Carbono').scrollIntoView();
    cy.contains('Simular Resultados ESG').click();

    cy.get('input').first().clear().type('600000');
    cy.get('input[type="range"]').eq(0).invoke('val', 25).trigger('input').trigger('change');
    cy.contains('Simular Resultados ESG').click();

    cy.get('input[type="range"]').eq(1).invoke('val', 75).trigger('input').trigger('change');
    cy.contains('Simular Resultados ESG').click();
  });

  // ─── CT02 ───────────────────────────────────────────────
  it('CT02 - Visualização e fechamento do Ranking de Sustentabilidade', () => {
    cy.contains('Ranking de Sustentabilidade').click();
    cy.wait(1000);
    // Clica no elemento no canto superior direito do modal usando a classe ou posição
    cy.get('div, span, button').find('svg, img, [class*="close"]').last().click({ force: true });
  });

  // ─── CT03 ───────────────────────────────────────────────
  it('CT03 - Consulta ao Histórico e Evolução', () => {
    cy.contains('Histórico e Evolução').click();
    // Força o scroll mesmo se a janela principal parecer não rolável
    cy.scrollTo('center', { ensureScrollable: false });
    cy.wait(1000);
    cy.contains('Voltar').click();
  });

  // ─── CT04 ───────────────────────────────────────────────
  it('CT04 - Visualização da Floresta Corporativa', () => {
    cy.contains('Floresta Corporativa').click();
    cy.wait(2000);
  });

});