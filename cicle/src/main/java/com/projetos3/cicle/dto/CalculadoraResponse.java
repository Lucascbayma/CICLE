package com.projetos3.cicle.dto;

public class CalculadoraResponse {
    private double emissoesCenarioAtual;
    private double emissoesCenario100Fisico;
    private double carbonoEconomizado;
    private int arvoresSalvas;

    public CalculadoraResponse(double emissoesCenarioAtual, double emissoesCenario100Fisico, double carbonoEconomizado, int arvoresSalvas) {
        this.emissoesCenarioAtual = emissoesCenarioAtual;
        this.emissoesCenario100Fisico = emissoesCenario100Fisico;
        this.carbonoEconomizado = carbonoEconomizado;
        this.arvoresSalvas = arvoresSalvas;
    }

    public double getEmissoesCenarioAtual() { return emissoesCenarioAtual; }
    public void setEmissoesCenarioAtual(double emissoesCenarioAtual) { this.emissoesCenarioAtual = emissoesCenarioAtual; }
    public double getEmissoesCenario100Fisico() { return emissoesCenario100Fisico; }
    public void setEmissoesCenario100Fisico(double emissoesCenario100Fisico) { this.emissoesCenario100Fisico = emissoesCenario100Fisico; }
    public double getCarbonoEconomizado() { return carbonoEconomizado; }
    public void setCarbonoEconomizado(double carbonoEconomizado) { this.carbonoEconomizado = carbonoEconomizado; }
    public int getArvoresSalvas() { return arvoresSalvas; }
    public void setArvoresSalvas(int arvoresSalvas) { this.arvoresSalvas = arvoresSalvas; }
}