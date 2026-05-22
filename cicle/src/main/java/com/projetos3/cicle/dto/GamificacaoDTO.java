package com.projetos3.cicle.dto;

public class GamificacaoDTO {
    private double carbonoAcumulado;
    private int paisesDisponiveis;
    private double carbonoProximoPais;
    private String[] paisesSalvos;

    public double getCarbonoAcumulado() { return carbonoAcumulado; }
    public void setCarbonoAcumulado(double carbonoAcumulado) { this.carbonoAcumulado = carbonoAcumulado; }
    public int getPaisesDisponiveis() { return paisesDisponiveis; }
    public void setPaisesDisponiveis(int paisesDisponiveis) { this.paisesDisponiveis = paisesDisponiveis; }
    public double getCarbonoProximoPais() { return carbonoProximoPais; }
    public void setCarbonoProximoPais(double carbonoProximoPais) { this.carbonoProximoPais = carbonoProximoPais; }
    public String[] getPaisesSalvos() { return paisesSalvos; }
    public void setPaisesSalvos(String[] paisesSalvos) { this.paisesSalvos = paisesSalvos; }
}